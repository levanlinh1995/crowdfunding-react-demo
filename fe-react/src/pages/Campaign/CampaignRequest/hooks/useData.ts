import { useMemo } from 'react'
import { ICampaign } from '../container/CampaignRequest'

const useDataRequest = (data: ICampaign | undefined) => {
  const dataTable = useMemo(() => {
    return data?.requests?.map((i) => {
      return {
        key: i[2],
        id: i[4],
        description: i[0],
        recipient: i[2],
        amount: 100,
        approvalCount: `${i.approvalCount}/${data.approversCount}`
      }
    })
  }, [data])

  return {
    dataTable
  }
}

export default useDataRequest
