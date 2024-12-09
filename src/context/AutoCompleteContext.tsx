import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react'
import { CountryResponse, Option } from '@/types/AutoCompleteTypes'
import axios from 'axios'

interface AutoCompleteProviderProps {
  children: ReactNode
}

interface AutoCompleteContextType {
  autoCompleteData: Option[]
  setQuery: (query: string) => void
  query: string
}

// Create the context
const AutoCompleteContext = createContext<AutoCompleteContextType | undefined>(
  undefined,
)

export const AutoCompleteProvider: React.FC<AutoCompleteProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<Option[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<CountryResponse[]>(
          'https://restcountries.com/v3.1/all',
        )
        const countries = response.data.map((country, index) => ({
          id: index,
          label: country.name.common,
        }))
        setData(countries)
      } catch (error) {
        console.error('Error fetching data from API:', error)
        setData([])
      }
    }

    fetchCountries()
  }, [])

  const autoCompleteData = useMemo(() => {
    if (!query.trim()) return data
    return data.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, data])

  return (
    <AutoCompleteContext.Provider value={{ autoCompleteData, setQuery, query }}>
      {children}
    </AutoCompleteContext.Provider>
  )
}

// Hook for consuming context
export const useAutoComplete = (): AutoCompleteContextType => {
  const context = useContext(AutoCompleteContext)
  if (!context) {
    throw new Error(
      'useAutoComplete must be used within an AutoCompleteProvider',
    )
  }
  return context
}
