
const Verifier = artifacts.require('Verifier');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const proof = require('../../zokrates/code/square/proof');
const incorrectProof = require('../../zokrates/code/square/incorrect_proof');

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
            let key = 1111;
            try{
                // await this.contract.addSolution(key, 1, account1);
            }catch(Error){
                revert = true;
            }
            assert.equal(result, false, 'Error in adding solution');
        });

        it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function () { 
            //minting functionality test
        });
    });
}



