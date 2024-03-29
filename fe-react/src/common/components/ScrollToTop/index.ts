import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type PropsType = {
  children: React.ReactElement
}

export const ScrollToTop = (props: PropsType) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return props.children
}
