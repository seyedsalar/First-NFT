require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle")
require("dotenv").config();

const { task } = require("hardhat/config");

task("accounts","Prints the lists of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }

});



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url: process.env.ALCHEMY_URL ,
      accounts:[process.env.WALLET_PRIVATE_KEY],
      
    }
  }
};


