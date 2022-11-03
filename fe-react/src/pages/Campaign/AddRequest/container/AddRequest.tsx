import { CAMPAIGN } from '@/common/constants/routes'
import { Button, Form, Input } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './AddRequest.module.scss'
import Campaign from '@/utils/campaign'
import web3 from '@/utils/web3'

interface IFormSubmit {
  description: string
  value: string
  recipient: string
}

const AddRequest = () => {
  const navigate = useNavigate()
  const { address } = useParams()

  const [form] = Form.useForm<IFormSubmit>()

  const onFinish = async (formData : IFormSubmit) => {
    // const accounts = await web3.eth.getAccounts();
    const account = web3.currentProvider.selectedAddress
    const campaign = Campaign(address);

    await campaign.methods
      .createRequest(formData.description, web3.utils.toWei(formData.value, 'ether'), formData.recipient)
      .send({ from: account });
  }
  return (
    <div className={styles.root}>
      <h2>Create a Request</h2>
      <Form
        name='user-setting'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className={styles.userSettingForm}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label='Description' name='description'>
          <Input placeholder='' />
        </Form.Item>
        <Form.Item label='Value in Ether' name='value'>
          <Input placeholder='' />
        </Form.Item>
        <Form.Item label='Recipient' name='recipient'>
          <Input placeholder='' />
        </Form.Item>
        <Form.Item className={styles.formButtons}>
          <Button
            htmlType='button'
            className={styles.actionTBtn}
            onClick={() => navigate(`${CAMPAIGN}/${address}/requests`)}
          >
            Cancel
          </Button>

          <Button
            className={styles.actionTBtn}
            style={{ marginLeft: '20px' }}
            type='primary'
            htmlType='submit'
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddRequest
