import { useMemo } from 'react'
import { ICampaign } from '../container/CampaignRequest'

const useDataRequest = (data: ICampaign | undefined) => {
  const dataTable = useMemo(() => {
    return data?.requests?.map((i, index) => {
      return {
        key: index,
        id: index,
        description: i.description,
        recipient: i.recipient,
        amount: i.value,
        approvalCount: `${i.approvalCount}/${data.approversCount}`
      }
    })
  }, [data])

  return {
    dataTable
  }
}

export default useDataRequest
