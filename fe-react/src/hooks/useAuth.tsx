
const useAuth = () => {
  const user =  {
    username: 'TEST'
  }
  const isAdmin = false
  const isPrivate = false

  return {
    user,
    isAdmin,
    isPrivate
  }
}

export default useAuth
