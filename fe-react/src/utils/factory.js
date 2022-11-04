import web3 from './web3'

import CampaignFactory from '../ethereum/build/contracts/CampaignFactory.json'

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x80fFea295216d6049091a6FAD5EC9a3428094793')

export default instance
