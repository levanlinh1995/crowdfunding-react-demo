import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Campaign from '@/utils/campaign'
import { Table, Button } from 'antd'
import { ColumnsType } from 'antd/lib/table/Table'
import styles from './CampaignRequest.module.scss'
import useDataRequest from '../hooks/useData'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { CAMPAIGN } from '@/common/constants/routes'

export interface ICampaign {
  address?: string
  requestCount?: number
  approversCount?: number
  requests?: {
    0: string
    1: string
    2: string
    3: number
    4: string
    approvalCount: string
    complete: boolean
    description: string
    recipient: string
    value: string
  }[]
}

export interface IDataTable {
  id: string
  description: string
  recipient: string
  amount: number
  approvalCount: string
}

const CampaignRequest = () => {
  const { address } = useParams()
  const [campaign, setCampaign] = useState<ICampaign>()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const campaign = Campaign(address)
        const requestCount = await campaign.methods.getRequestsCount().call()
        const approversCount = await campaign.methods.approversCount().call()

        const requests = await Promise.all(
          Array(parseInt(requestCount))
            .fill('campaign')
            .map((element, index) => {
              return campaign.methods.requests(index).call()
            })
        )

        setCampaign((prev) => {
          return {
            ...prev,
            address,
            campaign,
            requestCount,
            approversCount,
            requests
          }
        })
      } catch (err) {
        // console.log('err', err)
      }
    }

    fetchApi()
  }, [])

  const hdApprove = (id: string) => {
    console.log('id', id)
  }
  const hdFinalize = (id: string) => {
    console.log('id', id)
  }

  const { dataTable } = useDataRequest(campaign)

  const columns: ColumnsType<IDataTable> = useMemo(
    () => [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        title: 'Amount',
        dataIndex: 'amount'
      },
      {
        title: 'Recipient',
        dataIndex: 'recipient',
        width: '40%'
      },
      {
        title: 'Approval Count',
        dataIndex: 'approvalCount'
      },
      {
        title: 'Approve',
        dataIndex: 'approve',
        width: '20%',
        render: (_, record) => {
          return (
            <Button onClick={() => hdApprove(record.id)} className={styles.approveBtn}>
              approve
            </Button>
          )
        }
      },
      {
        title: 'Finalize',
        dataIndex: 'finalize',
        width: '20%',
        render: (_, record) => {
          return (
            <Button onClick={() => hdFinalize(record.id)} className={styles.finalizeBtn}>
              finalize
            </Button>
          )
        }
      }
    ],
    []
  )

  return (
    <div className={styles.root}>
      <div className={styles.backBtn}>
        <ArrowLeftOutlined style={{ fontSize: '12px' }} />
        <Link to={`${CAMPAIGN}/${address}`}>Campaign detail</Link>
      </div>
      <div className={styles.title}>
        <h2>REQUEST</h2>
        <Button>Add Request</Button>
      </div>

      <div className={styles.tableContainer}>
        {dataTable && (
          <Table<IDataTable>
            columns={columns}
            dataSource={dataTable}
            bordered
            pagination={false}
            className={styles.table}
          />
        )}
      </div>
    </div>
  )
}

export default CampaignRequest
