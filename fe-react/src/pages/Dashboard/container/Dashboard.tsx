import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import factory from '@/utils/factory'
import styles from './Dashboard.module.scss'
import { PlusOutlined } from '@ant-design/icons'
import { CAMPAIGN } from '@/common/constants/routes'

const Dashboard = () => {
  const navigate = useNavigate()

  const [campaignList, setCampaignList] = useState<string[]>()

  useEffect(() => {
    try {
      const fetchApi = async () => {
        const campaigns = await factory.methods.getDeployedCampaigns().call()

        setCampaignList(campaigns)
      }
      fetchApi()
    } catch (err) {
      // err
    }
  }, [])

  const hdViewMore = (address: string) => {
    navigate(`${CAMPAIGN}/${address}`)
  }

  const hdCreateNew = () => {
    navigate(`${CAMPAIGN}/new`)
  }

  return (
    <div className={styles.wrapper}>
      <Button onClick={hdCreateNew} className={styles.createNewBtn} icon={<PlusOutlined />}>
        Create new
      </Button>
      <div className={styles.listCampaign}>
        {campaignList?.map((i) => {
          return (
            <Card
              key={i}
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
              onClick={() => hdViewMore(i)}
            >
              <Card.Meta title='Campaign' description={`${i}`} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
