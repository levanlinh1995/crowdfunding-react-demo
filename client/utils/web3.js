import Web3 from 'web3';

// const HDWalletProvider = require("@truffle/hdwallet-provider");

const { GOERLI_KEY, MNEMONIC } = require('../interaction.json');

let web3;

const ethEnabled = async () => {
if (window.ethereum) {
    await window.ethereum.request({method: 'eth_requestAccounts'});
    window.web3 = new Web3(window.ethereum);
    return true;
}
    return false;
}
    

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    console.log('connected Metamask')
    web3 = new Web3(window.ethereum);

    ethEnabled();
} else {
    const provider = new Web3.providers.HttpProvider(
        // `https://goerli.infura.io/v3/${GOERLI_KEY}`,
        'http://127.0.0.1:7545'
    );

    console.log('connected Infura')

    web3 = new Web3(provider);
}

// const provider = new Web3.providers.HttpProvider(
//     `https://goerli.infura.io/v3/${GOERLI_KEY}`,
//     // 'http://127.0.0.1:8545'
// );

// const provider = new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${GOERLI_KEY}`);

// web3 = new Web3(provider);

// const test = async () => {
//     const accounts = web3.eth.getAccounts();
//     console.log('dslfjsdl')

//       console.log(accounts);
// }

// test();



export default web3;