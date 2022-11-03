import Web3 from 'web3'

// const HDWalletProvider = require("@truffle/hdwallet-provider");

let web3

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  console.log(' Metamask is installed')
  window.web3 = new Web3(window.ethereum)
  web3 = window.web3

  try {
    // Request account access if needed
    window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    // User denied account access...
  }
} else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // Legacy dapp browsers...
  window.web3 = new Web3(window.web3.currentProvider)
  web3 = window.web3
} else {
  // Non-dapp browsers

  alert('please install Metamask');

  // const provider = new Web3.providers.HttpProvider(
  //   `https://goerli.infura.io/v3/${Interaction.GOERLI_KEY}`
  //   // 'http://127.0.0.1:7545'
  // )

  // console.log('connected Infura')

  // web3 = new Web3(provider)
}

// const provider = new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${GOERLI_KEY}`);

export default web3
