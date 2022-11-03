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
        const newArray: ISmartContract[] = []
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        
        campaigns.forEach(async (element) => {
          const campaign = Campaign(element);
          const summary = await campaign.methods.getSummary().call();
          const campaignId = summary[0]
          const response = await campaignApi.getCampaignById(campaignId)
          
          // const newCampaign = {
          //   ...response.data,
          //   minimumAmount: summary[1],
          //   balance: summary[2],
          //   numberOfRequest: summary[3],
          //   numberOfApprovers: summary[4],
          //   managerAddress: summary[5]
          // }

          const newCampaign = {
            minimumAmount: summary[1],
            balance: summary[2],
            numberOfRequest: summary[3],
            numberOfApprovers: summary[4],
            managerAddress: summary[5]
          }

          //console.log('newCampaign::', newCampaign)

        });
        console.log('newArray::', newArray)
        setCampaignList(newArray)
        

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

  console.log('campaignList::', campaignList?.length)
  return (
    <div className={styles.wrapper}>
      <Button onClick={hdCreateNew} className={styles.createNewBtn} icon={<PlusOutlined />}>
        Create new
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
              onClick={() => hdViewMore(campaign?.managerAddress || '')}
            >
              <Card.Meta title='Campaign' description={`${campaign?.managerAddress}`} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
