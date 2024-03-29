import { Button, Form, Input, InputNumber } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './CreateCampaign.module.scss'
import factory from '@/utils/factory'
import campaignApi from '@/api/campaignApi'
import web3 from '@/utils/web3'

interface IFormSubmit {
  minimumContribution: string,
  title: string
  shortDescription: string
  description: string
  status: number
  imageUrl: string
}

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<IFormSubmit>()

  const onFinish = async (formData: IFormSubmit) => {
    const {minimumContribution, ...campaignData} = formData;

    const response = await campaignApi.add(campaignData);
    const {id} = response.data

    const account = web3.currentProvider.selectedAddress


    await factory.methods
      .createCampaign(id, minimumContribution)
      .send({
        from: account
      });

    navigate('/')
  }

  return (
    <div className={styles.root}>
      <h2>Create New Campaign</h2>
      <Form
        name='user-setting'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className={styles.userSettingForm}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label='Minimum Contribution (Wei)' name='minimumContribution'>
          <Input placeholder='' />
        </Form.Item>
        <Form.Item label='Title' name='title'>
          <Input placeholder='Title'/>
        </Form.Item>
        <Form.Item label='Short Description' name='shortDescription'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label='Description' name='description'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label='Status' name='status'>
          <InputNumber min={1} placeholder='status' />
        </Form.Item>
        <Form.Item label='Image' name='imageUrl' rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}>
          <Input placeholder='Image Url' />
        </Form.Item>
        <Form.Item className={styles.formButtons}>
          <Button
            htmlType='button'
            className={styles.actionTBtn}
            onClick={() => navigate('/')}
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

export default CreateCampaign
