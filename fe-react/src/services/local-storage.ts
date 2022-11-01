const StorageService = {
  set: (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data))
  },

  get: (key: string) => {
    const data = localStorage.getItem(key) as string
    return JSON.parse(data)
  },

  remove: (key: string) => {
    localStorage.removeItem(key)
  },

  has: (key: string) => {
    return !!localStorage.getItem(key)
  }
}

export default StorageService
