import React, { createContext, useState } from 'react'
import { useContext } from 'react'

interface IStateContext {
  searchQuery: string
  setSearchQuery: (query: string) => void
  isSearchVisible: boolean
  setIsSearchVisible: (value: boolean) => void
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const initialState: IStateContext = {
  searchQuery: '',
  setSearchQuery: (query) => {},
  isSearchVisible: false,
  setIsSearchVisible: (value) => {},
  isLoading: false,
  setIsLoading: (value) => {},
}

export const AppContext = createContext(initialState)

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSearchVisible,
        setIsSearchVisible,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
