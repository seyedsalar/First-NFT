const {ethers} = require("hardhat");

async function main(){
    const MyNFT = await ethers.getContractFactory("MyNFT");

    const gasPrice = await MyNFT.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);
    

    const myNft = await MyNFT.deploy("MyFirstNFT","MNFT");
    await myNft.deployed();
    console.log("Contract Successfully Deployed to:",myNft.address);    
}

main().then(()=>proccess.exit(0)).catch((error)=>{
    console.log(error);
    proccess.exit(1);
});
