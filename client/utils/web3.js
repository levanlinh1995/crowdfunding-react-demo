import Web3 from 'web3';


const { GOERLI_KEY } = require('../interaction.json');

let web3;

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//     web3 = new Web3(window.web3.currentProvider);
// } else {
//     const provider = new Web3.providers.HttpProvider(
//         // `https://goerli.infura.io/v3/${GOERLI_KEY}`,
//         'http://127.0.0.1:7545'
//     );

//     web3 = new Web3(provider);
// }

const provider = new Web3.providers.HttpProvider(
    // `https://goerli.infura.io/v3/${GOERLI_KEY}`,
    'http://127.0.0.1:7545'
);

web3 = new Web3(provider);

export default web3;