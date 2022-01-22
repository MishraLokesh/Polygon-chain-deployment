var account = null;

//Connect the wallet
let connect_metamask = (async () => {
  
  if(window.ethereum) {
    await window.ethereum.enable();
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);

    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById('wallet-address').textContent = account;
  }
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
  }
});


//Deploy the contract
const deploy = async (abi, bytecode) => {
  var deployingContract = await new web3.eth.Contract(abi).deploy({
    data: bytecode,
    arguments: []
  });
  var estimatedGas = await deployingContract.estimateGas();

  var deployedContract = await deployingContract.send({
    from: account,
    gas: estimatedGas
  });

  console.log(deployedContract.options.address);

  return deployedContract.options.address;
}


connect_metamask()

// await deploy(process.env.ABI, process.env.BYTECODE)
// deploy(
//   [
//     {
//       "inputs": [],
//       "name": "count",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "increment",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ], 
//   0x60806040526000805534801561001457600080fd5b5061018b806100246000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806306661abd1461003b578063d09de08a14610059575b600080fd5b610043610077565b60405161005091906100ab565b60405180910390f35b61006161007d565b60405161006e91906100ab565b60405180910390f35b60005481565b6000600160005461008e91906100c6565b600081905550600054905090565b6100a58161011c565b82525050565b60006020820190506100c0600083018461009c565b92915050565b60006100d18261011c565b91506100dc8361011c565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561011157610110610126565b5b828201905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220a8ae6f874e52cd87b3cefbd7a12e761d23cb070c816f73e56a280b0fce7c263664736f6c63430008070033
//   )


