import styles from './Header.module.scss'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.Header}>
      <p onClick={() => navigate('/')}>CROWFUNDING</p>
    </div>
  )
}

export default Header
