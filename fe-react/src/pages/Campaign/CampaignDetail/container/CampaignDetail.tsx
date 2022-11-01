import { Button, Card } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useDetailData from '../hooks/useDetailData'
import styles from './CampaignDetail.module.scss'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { CAMPAIGN } from '@/common/constants/routes'

const CampaignDetail = () => {
  const navigate = useNavigate()
  const { address } = useParams()
  const { detailData } = useDetailData()

  const hdViewRequest = () => {
    navigate(`${CAMPAIGN}/${address}/requests`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.backBtn}>
        <ArrowLeftOutlined style={{ fontSize: '12px' }} />
        <Link to={'/'}>Campaign</Link>
      </div>
      <h2>Campaign Show</h2>
      <div className={styles.detail}>
        <Card
          key={detailData.id}
          hoverable={true}
          style={{ width: 500, marginRight: 20 }}
          cover={
            <img
              alt='example'
              width={500}
              style={{ borderRadius: '10px' }}
              src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            />
          }
        ></Card>
        <div className={styles.infoCampaign}>
          <div style={{ textAlign: 'start' }}>
            <p className={styles.title}>{address}</p>
            <p>{detailData.title}</p>
            <p>{detailData.short_description}</p>
            <p>{detailData.status}</p>
          </div>
          <Button onClick={hdViewRequest}>View request</Button>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail
