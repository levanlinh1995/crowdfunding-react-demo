import web3 from './web3'
import Campaign from '../ethereum/build/contracts/Campaign.json'

export default (address) => {
  return new web3.eth.Contract(Campaign.abi, address)
}
