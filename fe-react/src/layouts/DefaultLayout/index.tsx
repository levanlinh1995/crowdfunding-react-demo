import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div className='default'>
      <Outlet />
    </div>
  )
}

export default DefaultLayout
