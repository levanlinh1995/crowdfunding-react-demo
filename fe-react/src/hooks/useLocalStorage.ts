import { useState } from 'react'

export const useLocalStorage = <T>(keyname: string, defaultValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoreValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyname)

      if (value) {
        return JSON.parse(value)
      } else {
        window.localStorage.setItem(keyname, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(keyname, JSON.stringify(value))
      setStoreValue(value)
    } catch (err) {
      setStoreValue(value)
    }
  }

  return [storedValue, setValue]
}
