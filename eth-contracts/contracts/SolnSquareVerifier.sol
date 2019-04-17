pragma solidity >=0.4.21 <0.6.0;

import './ERC721Mintable.sol';
import './Verifier.sol';

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is AjToken{
    // define a solutions struct that can hold an index & an address - Done
    struct Solution {
        uint256 index;
        address Address;
    }
    // TODO define an array of the above struct
    Solution[] solutions;
    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private solutionMapping;
    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address owner, uint256 index);
    
    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    Verifier public verifier;

    constructor(address verifierAddress) public {
        verifier = Verifier(verifierAddress);
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(bytes32 key, uint256 index, address Address) public{
        
        require(solutionMapping[key].Address == address(0), "Key already exists");
        Solution memory solution = Solution({index: index, Address: Address});
        solutions.push(solution);
        solutionMapping[key] = solution;
        
        emit SolutionAdded(Address, index);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2] memory a_p,
        uint[2][2] memory b,
        uint[2] memory b_p,
        uint[2] memory c,
        uint[2] memory c_p,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    )
        public
    {   
        //Verify the solution
        require(verifier.verifyTx(a, a_p, b, b_p, c, c_p, h, k, input), "Unable to verify - Wrong proof");

        //hash the solution to get the key
        bytes32 key = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));

        //add solution
        addSolution(key, tokenId, to);

        super.mint(to, tokenId);
    }
}
