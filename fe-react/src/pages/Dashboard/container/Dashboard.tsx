import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import factory from '@/utils/factory'
import styles from './Dashboard.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { CAMPAIGN } from '@/common/constants/routes'
import campaignApi from '@/api/campaignApi'
import Campaign from '@/utils/campaign'
import { ISmartContract } from '@/common/ts/interfaces'

const Dashboard = () => {
  const navigate = useNavigate()

  const [campaignList, setCampaignList] = useState<ISmartContract[]>()

  useEffect(() => {
    try {
      const fetchApi = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        console.log('campaigns::', campaigns)

        const newCampaigns = await Promise.all(campaigns.map(async (element) => {
          const campaign = Campaign(element);
          const summary = await campaign.methods.getSummary().call();
          const campaignId = summary[0]
          const response = await campaignApi.getCampaignById(campaignId)

          return {
            ...response.data,
            minimumAmount: summary[1],
            balance: summary[2],
            numberOfRequest: summary[3],
            numberOfApprovers: summary[4],
            managerAddress: summary[5],
            address: element
          }
        }))

        setCampaignList(newCampaigns)


      }
      fetchApi()
    } catch (err) {
      console.log('err::', err)
      // err
    }
  }, [])

  const hdViewMore = (address: string) => {
    navigate(`${CAMPAIGN}/${address}`)
  }

  const hdCreateNew = () => {
    navigate(`${CAMPAIGN}/new`)
  }

  console.log('campaignList::', campaignList)
  return (
    <div className={styles.wrapper}>
      <Button onClick={hdCreateNew} className={styles.createNewBtn} icon={<PlusOutlined />}>
        Create new campaign
      </Button>
      <div className={styles.listCampaign}>
        {campaignList && campaignList?.map((campaign) => {
          return (
            <Card
              key={campaign?.id}
              hoverable={true}
              style={{ width: 300, minHeight: 400 }}
              cover={
                <img
                  alt='example'
                  width={300}
                  style={{ borderRadius: '10px 10px 0 0' }}
                  src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                />
              }
              onClick={() => hdViewMore(campaign?.address || '')}
            >
              <Card.Meta title={`${campaign?.title || ''}`} description={`${campaign?.address}`} />
              <div className='ant-card-meta-detail ant-card-campaign-info'>
                <div className='campaign-row'>
                  <p className='ant-text-small'>minimum amount: {campaign?.minimumAmount}</p>
                  <p className='ant-text-small'>number of request: {campaign?.numberOfRequest}</p>
                </div>
                <div className='campaign-row'>
                  <p className='ant-text-small'>number of contributor: {campaign?.numberOfApprovers}</p>
                  <p className='ant-text-small'>manager address: {campaign?.managerAddress}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
