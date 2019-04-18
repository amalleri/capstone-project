
const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('../../zokrates/code/square/proof');
const incorrectProof = require('../../zokrates/code/square/incorrect_proof');
var web3 = require('web3');

contract('TestSolSquareVerifier', accounts => {
    let account = accounts[0];
    let account1 = accounts[1];
    let account2 = accounts[2];

    describe('Test verification', function () {
        beforeEach(async function () { 
            let verifierContract = await Verifier.new({from: account});
            this.contract = await SolnSquareVerifier.new(verifierContract.address, {from: account});
        });
        
        it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () { 
            
            let revert = false;
            let key = "0x74657374000000000000000000000";
            try{
                await this.contract.addSolution(key, 1, account1, {from: account});
            }catch(Error){
                revert = true;
            }
            assert.equal(revert, false, 'Error in adding solution');

            //trying to add the same solution twice with a different index
            revert = false;
            try{
                await this.contract.addSolution(key, 2, account1, {from: account});
            }catch(Error){
                revert = true;
            }
            assert.equal(revert, true, 'Duplicate key inserted!!!');
        });

        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () { 
            //minting functionality test
            let revert = false;
            let result;
            try{
                result = await this.contract.mintNewNFT(
                    account2, 
                    2,
                    proof.proof.A, 
                    proof.proof.A_p, 
                    proof.proof.B, 
                    proof.proof.B_p, 
                    proof.proof.C, 
                    proof.proof.C_p, 
                    proof.proof.H, 
                    proof.proof.K, 
                    proof.input,
                    {from: account});
            }catch(Error){
                revert = true;
            }
            assert.equal(revert, false, 'Error in minting new token');
            assert.equal(result.logs[0].event, 'SolutionAdded');
            assert.equal(result.logs[1].event, 'Transfer');
            assert.equal(result.logs[1].args.tokenId, 2);
            assert.equal(result.logs[1].args.to, account2);

            //testing duplicate token
            revert = false;
            try{
                await this.contract.mintNewNFT(
                    account3, 
                    3,
                    proof.proof.A, 
                    proof.proof.A_p, 
                    proof.proof.B, 
                    proof.proof.B_p, 
                    proof.proof.C, 
                    proof.proof.C_p, 
                    proof.proof.H, 
                    proof.proof.K, 
                    proof.input,
                    {from: account2});
            }catch(Error){
                revert = true;
            }
            assert.equal(revert, true, 'Duplicate token minted!!!');

            //testing incorrect proof
            revert = false;
            try{
                await this.contract.mintNewNFT(
                    account3, 
                    3,
                    incorrectProof.proof.A, 
                    incorrectProof.proof.A_p, 
                    incorrectProof.proof.B, 
                    incorrectProof.proof.B_p, 
                    incorrectProof.proof.C, 
                    incorrectProof.proof.C_p, 
                    incorrectProof.proof.H, 
                    incorrectProof.proof.K, 
                    incorrectProof.input,
                    {from: account2});
            }catch(Error){
                revert = true;
            }
            assert.equal(revert, true, 'Incorrect token minted!!!');
        });
    });
});



