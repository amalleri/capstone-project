// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function (deployer, networks, accounts) {
  deployer.deploy(Verifier)
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address, "RealEstate-MintNewNFT", "AJT", { from: accounts[0] });
    });
};