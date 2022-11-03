export interface ICampaign {
  id?: number
  title?: string
  description?: string
  shortDescription?: string
  status?: number
  imageUrl?: string
}

export interface ISmartContract extends ICampaign{
  minimumAmount?: string
  managerAddress?: string
  numberOfRequest?: string
  numberOfApprovers?: string
}