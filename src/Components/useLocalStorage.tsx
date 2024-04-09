import { useEffect, useState } from "react"

// initialValue can be direct value that can be set or initialValue can be function that returns value that is used set in LocalStorage 
// for example initialValue can be [value] (direct value) or ()=>{ return [value]}
const useLocalStorage = <T,>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)()
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key])
  return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage
