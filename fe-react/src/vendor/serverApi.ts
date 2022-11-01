const SERVER = () => {
  const _SERVER_ = {
    domain: ''
  }

  switch (process.env.NODE_ENV) {
    case 'test':
      _SERVER_.domain = 'http://localhost:3000'
      break
    case 'production':
      _SERVER_.domain = 'http://localhost:3000'
      break
    case 'development':
    default:
      _SERVER_.domain = 'http://localhost:3000'
      break
  }
  return _SERVER_
}

export { SERVER }
