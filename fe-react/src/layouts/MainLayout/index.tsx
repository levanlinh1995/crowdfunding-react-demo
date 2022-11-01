import Header from '@/common/components/Header'
// import SideBar from '@/common/components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Header />
      {/* <SideBar /> */}
      <Outlet />
    </>
  )
}

export default MainLayout
