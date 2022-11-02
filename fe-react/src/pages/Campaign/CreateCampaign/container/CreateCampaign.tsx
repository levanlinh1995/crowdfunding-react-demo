import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './CreateCampaign.module.scss'
import factory from '@/utils/factory'

interface IFormSubmit {
  minimumContribution: string
}

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<IFormSubmit>()

  const onFinish = async (formData: IFormSubmit) => {
    // const accounts = await web3.eth.getAccounts();
    const account = '0x34c93F7B17B60D84eF6f2606296bb869d827E0B6';
    const campaignId =  1000;

    await factory.methods
      .createCampaign(campaignId, formData.minimumContribution)
      .send({
        from: account
      });
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
        <Form.Item label='Minimum Contribution' name='minimumContribution'>
          <Input placeholder='' />
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
