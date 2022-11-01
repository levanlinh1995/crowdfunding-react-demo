const Login = () => {
  const handleSubmit = () => {
    console.log('submit login')
  }
  return (
    <>
      <div>Login</div>
      <button onClick={handleSubmit}>Login</button>
    </>
  )
}

export default Login
