import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './CampaignDetail.module.scss'
import { Card, Button, Form, Input } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { CAMPAIGN } from '@/common/constants/routes'
import Campaign from '@/utils/campaign'
import { useEffect, useState } from 'react'
import campaignApi from '@/api/campaignApi'
import { ISmartContract } from '@/common/ts/interfaces'


import web3 from '@/utils/web3'

interface IFormSubmit {
  value: string
}

const CampaignDetail = () => {
  const [form] = Form.useForm<IFormSubmit>()
  const navigate = useNavigate()
  const { address } = useParams()
  const [ detailData, setDetailData ] = useState<ISmartContract>()

  const hdViewRequest = () => {
    navigate(`${CAMPAIGN}/${address}/requests`)
  }
  useEffect(() => {
    try {
      const fetchApi = async () => {
        const campaign = Campaign(address);

        const summary = await campaign.methods.getSummary().call();
        const campaignId = summary[0]

        const response = await campaignApi.getCampaignById(campaignId)

        setDetailData({...response.data, ...{
          minimumAmount: summary[1],
          balance: summary[2],
          numberOfRequest: summary[3],
          numberOfApprovers: summary[4],
          managerAddress: summary[5]
        } })

        // return {
        //   address: address,
        //   campaignId: summary[0],
        //   minimumContribution: summary[1],
        //   balance: summary[2],
        //   requestsCount: summary[3],
        //   approversCount: summary[4],
        //   manager: summary[5]
        // };
      }
      fetchApi()
    } catch (err) {
      // err
    }
  }, [])

  const onContribute = async (formData : IFormSubmit) => {
    // const accounts = await web3.eth.getAccounts();
    const account = web3.currentProvider.selectedAddress
    const campaign = Campaign(address);

    await campaign.methods.contribute().send({
      from: account,
      value: formData.value
    });

    window.location.reload();
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
          key={detailData?.id}
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
            <p>{detailData?.title}</p>
            <small className={styles.title}>{address}</small>
            <p>Total:</p>
            {detailData && (<div>
              <ul>
                <li>
                  <span>minimum amount:</span> {detailData?.minimumAmount}
                </li>
                <li>
                  <span>manager address:</span> {detailData?.managerAddress}
                </li>
                <li>
                  <span>number of request:</span> {detailData?.numberOfRequest}
                </li>
                <li>
                  <span>number of approvers:</span> {detailData?.numberOfApprovers}
                </li>
              </ul>
            </div>)}

          </div>
          <Button onClick={hdViewRequest}>View request</Button>
          
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.description}>
        <div className={styles.desLeft}>{detailData?.description}</div>
        <div>
          <Form
            form={form}
            layout="inline"
            onFinish={onContribute}
          >
            <Form.Item label='Value (Wei)' name='value'>
              <Input placeholder='' />
            </Form.Item>
            <Form.Item className={styles.formButtons}>
              <Button
                className={styles.actionTBtn}
                style={{ marginLeft: '20px' }}
                type='primary'
                htmlType='submit'
              >
                Contribute Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetail
