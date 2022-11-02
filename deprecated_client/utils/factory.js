import web3 from './web3'

const { factoryAddress } = require('../interaction.json')

import CampaignFactory from '../ethereum/build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    factoryAddress
);

export default instance;