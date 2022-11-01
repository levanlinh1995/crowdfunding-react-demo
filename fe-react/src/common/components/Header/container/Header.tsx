import styles from './Header.module.scss'
import { HomeFilled } from '@ant-design/icons'

const Header = () => {
  return (
    <div className={styles.Header}>
      <HomeFilled />
      <p>CROWFUNDING</p>
    </div>
  )
}

export default Header
