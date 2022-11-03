import { ICampaign, SingleResponse } from '@/common/ts/interfaces'
import axiosClient from './axiosClient'

const campaignApi = {
  add(param: ICampaign): Promise<SingleResponse<ICampaign>> {
    const url = '/campaigns'
    return axiosClient.post(url, param)
  },
  getCampaignById(id: string): Promise<SingleResponse<ICampaign>> {
    const url = `/campaigns/${id}`
    return axiosClient.get(url)
  }
}

export default campaignApi