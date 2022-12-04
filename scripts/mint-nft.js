require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.ALCHEMY_URL);

const contract = require("../artifacts/contracts/MyNft.sol/MyNFT.json");
const contractAddress = "0x8289C50691fFe558c58A6f9E29A70Ab11d4b0A5f";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(process.env.WALLET_PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': process.env.WALLET_PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mintNFT(process.env.WALLET_PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.WALLET_PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}


mintNFT('https://gateway.pinata.cloud/ipfs/QmR6hQjwQUdmk6AUVzYRYGQgtsAq4n4bjHjWM78eWT3whL');