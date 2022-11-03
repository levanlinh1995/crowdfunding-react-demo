import { ICampaign, SingleResponse } from '@/common/ts/interfaces'
import axiosClient from './axiosClient'

const campaignApi = {
  add(param: ICampaign): Promise<SingleResponse<ICampaign>> {
    const url = '/campaigns'
    return axiosClient.post(url, param)
  }
}

export default campaignApi