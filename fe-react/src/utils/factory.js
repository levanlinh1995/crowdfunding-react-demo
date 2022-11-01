import web3 from './web3'

import Interaction from '../interaction.json'

import CampaignFactory from '../ethereum/build/contracts/CampaignFactory.json'

const instance = new web3.eth.Contract(CampaignFactory.abi, Interaction.factoryAddress)

export default instance
