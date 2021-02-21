import { createContext, useContext } from 'react'

const defaultValue = {
  userId: null,
  setUserId: (userId: string) => {}
}

export const AppContext = createContext(defaultValue)

export const useAppContext = () => useContext(AppContext)
