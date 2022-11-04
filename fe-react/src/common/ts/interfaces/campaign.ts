export interface ICampaign {
  id?: number
  title?: string
  description?: string
  shortDescription?: string
  status?: number|string
  imageUrl?: string
}

export interface ISmartContract extends ICampaign{
  minimumAmount?: string
  managerAddress?: string
  numberOfRequest?: string
  numberOfApprovers?: string
  address?: string
}