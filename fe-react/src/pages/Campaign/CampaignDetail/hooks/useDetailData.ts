import { useMemo } from 'react'

const useDetailData = () => {
  const detailData = useMemo(() => {
    return {
      id: 12,
      title: 'Campaign 1',
      description: 'Campaign description',
      short_description: 'Campaign short_description',
      status: 7
    }
  }, [])

  return {
    detailData
  }
}

export default useDetailData