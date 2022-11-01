import styles from './Header.module.scss'
import { HomeFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.Header}>
      <HomeFilled onClick={() => navigate('/')} />
      <p>CROWFUNDING</p>
    </div>
  )
}

export default Header
