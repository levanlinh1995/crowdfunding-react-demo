import { ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { storageKeys } from '@/common/constants/storage-keys'
import StorageService from '@/services/local-storage'

interface Props {
  children?: ReactNode
}

const RequireAuth = ({ children }: Props) => {
  const location = useLocation()
  const isAuthenticated = process.env.APP_AUTH ? !!StorageService.get(storageKeys.authProfile): true

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} />
  } else if (children) {
    return <>{children}</>
  } else {
    return <Outlet />
  }
}

export default RequireAuth
