require('dotenv').config()

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
    document.getElementById("btnClickedValue").value = account;

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
  var deployingContract = new Web3.eth.Contract(abi).deploy({
    data: bytecode,
    arguments: []
  });
  var estimatedGas = await deployingContract.estimatedGas();

  var deployedContract = await deployingContract.send({
    from: account,
    gas: estimatedGas
  });

  console.log(deployedContract.options.address);

  return deployedContract.options.address;
}

connect_metamask()
deploy(process.env.ABI, process.env.BYTECODE)

const deployedAaccount = document.getElementById('wallet-address').textContent;

