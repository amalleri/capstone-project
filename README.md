# Udacity Blockchain Capstone

The capstone project is intended to build a decentralized real estate solution using Opensea Platform. ERC721 tokens are minted from the rinkeby network hosted contract and used to list the properties on the Opensea platform. 

## Install

Following packages were used to develop this project:

Truffle v5.0.12 (core: 5.0.12)

Solidity v0.5.0 (solc-js)

Node v10.2.1

Web3.js v1.0.0-beta.37

ZoKrates

## Tests

To run truffle tests:

Start ganache running on port 8545. Open a terminal window and enter the following commands starting at the root folder of the project

`cd eth-contracts`

`truffle test ./test/TestERC721Mintable.js`

`truffle test ./test/TestSquareVerifier.js`

`truffle test ./test/TestSolnSquareVerifier.js`

## Deployment to Rinkeby

Update the truffle.js file to add the infura settings for rinkeby. Open another terminal window and run the following command:

`truffle migrate --network rinkeby`

![Rinkeby Deployment Screenshot](/screenshots/rinkeby_deployment.png)

## Contract Addresses

https://rinkeby.etherscan.io/address/0x7817D4e34184508049F8f5EFfc7D68d6BAb6C6A3 - ERC721

https://rinkeby.etherscan.io/address/0x2fd33441b5f1725D942c1C034c26E2A134DC0ac2 - Verifier

## Contract Abi's

SolnSquareVerifier ABI - `/eth-contracts/abi/SolnSquareVerifier_ABI.json`

Verifier ABI - `/eth-contracts/abi/Verifier_ABI.json`

## Minted 10 tokens

### Following tokens were minted from rinkeby network. 10 additional proof files were generated from Zokrates library and used to mint these tokens. 

0xd10d498550d1a59bac9a7b0079b5e4433fb51430c1816e960731479db6ee907c

0x376069b23cbcfb279ec0e4ad9f01d3dc42aa823513cc4a06b9d80a6db4f27227

0x8ca5a4f1712704452159bafeac8fefd658108118f8c1660bd721c91b3a4abcb2

0x0d4da6c14f31bf8660e329b22249bc08d8498d120d0809717a262913475d4890

0xefdc5575029b09ebb2db20ea6471abccc9e5f91abee7cb1189ec9b2163e1ab14

0x94215bb5d9315244a0376783293f79ace07d68225c1a4891b1d4473f59551ad6

0xcd9ed0ebb0dfffc994f6281dffbac785be8eb9de07657a61ba414729a84c3cd3

0x55d5c371502173c7abd0b84a7828fc8f03094a3a9c5b5dc02384b6b772000911

0x7f14dad2675a56bda7894865bccd47067d0789272e0f7012d0147958d2df11ce

0x194fd32bf1f849af8aef2f022419fda0e13c2f10a32903c40118c98028812f98

## OpenSea Marketplace Storefront Link

https://rinkeby.opensea.io/category/ajtrealestate

## Requirements

Verified OpenSea with the SolnSquareVerifier tokens - List 10 properties using the Opensea marketplace, purchase 5 listed properties using a different address (In the storefront, one account has been used to list the tokens and another account has been used to purchase the listed properties)

## Screenshot 

### Below screenshot shows the 10 properties listed in the Opensea platform.

![Open Sea Listing Screenshot](/screenshots/OpenSea_Listing.png)

### Below screenshot shows the 5 properties which were bought from account1 and transferred to account2

![Open Sea Items Bought Screenshot](/screenshots/Opensea_properties_bought.png)

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
