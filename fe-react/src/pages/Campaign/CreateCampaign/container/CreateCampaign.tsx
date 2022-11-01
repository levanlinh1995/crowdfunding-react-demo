import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './CreateCampaign.module.scss'

interface IFormSubmit {
  contribution: string
}

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<IFormSubmit>()

  const onFinish = (values: IFormSubmit) => {
    console.log('values', values)
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
        <Form.Item label='Minimum Contribution' name='contribution'>
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
