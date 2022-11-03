import web3 from './web3'

import CampaignFactory from '../ethereum/build/contracts/CampaignFactory.json'

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x457eB2535A81B6E587EbeBdf3CBBa94fFFf9dD98')

export default instance
