var AjToken = artifacts.require('AjToken');

contract('TestERC721Mintable', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await AjToken.new('Custom Token', 'AJT', {from: account_one});

            // TODO: mint multiple tokens - done
            await this.contract.mint(account_two, 1, {from: account_one});
            await this.contract.mint(account_two, 2, {from: account_one});
            await this.contract.mint(account_four, 3, {from: account_one});
            
        })

        it('should return total supply', async function () { 
            let result = await this.contract.totalSupply.call({from: account_one});
            assert.equal(result, 3, 'Total supply is invalid');
        })

        it('should get token balance', async function () { 
            let result = await this.contract.balanceOf(account_two, {from: account_one});
            assert.equal(result, 2, 'Token balance is invalid');
            result = await this.contract.balanceOf(account_four, {from: account_one});
            assert.equal(result, 1, 'Token balance is invalid');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            //first token
            let result = await this.contract.tokenURI(1, {from: account_one});
            assert.equal(result, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', 'Invalid first token uri ');
            
            //second token
            result = await this.contract.tokenURI(2, {from: account_one});
            assert.equal(result, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2', 'Invalid second token uri');

            //third token
            result = await this.contract.tokenURI(3, {from: account_one});
            assert.equal(result, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3', 'Invalid third token uri');
        })

        it('should transfer token from one owner to another', async function () { 
            let result = await this.contract.transferFrom(account_two, account_three, 2, {from: account_two});
            assert.equal(result.logs[0].args.from, account_two, 'Invalid from account');
            assert.equal(result.logs[0].args.to, account_three, 'Invalid to account');
        })
    });

    describe('have ownership properties', function () {
        
        beforeEach(async function () { 
            this.contract = await AjToken.new('Custom Token123', 'AJT', {from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let revert  = false;
            try{
                await this.contract.mint(account_three, 2, {from: account_two});
            }catch(Error) {
                revert = true;
            }
            
            assert.equal(revert, true, 'Error in minting with an invalid contract owner');
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.owner.call({from: account_one});
            assert.equal(result, account_one, 'Invalid contract owner returned');
        })

    });
})