import React from 'react'
import SuggestionItem from '@/components/atoms/SuggestionItem'
import { Option } from '@/types/AutoCompleteTypes'

interface AutoCompleteListProps {
  data: Option[]
  query: string
  onSelect: (option: Option) => void
}

const AutoCompleteList: React.FC<AutoCompleteListProps> = ({
  data,
  query,
  onSelect,
}) => {
  if (!data.length) {
    return <li className="p-2 text-gray-500 list-none">No results found</li>
  }

  return (
    <ul className="mt-2 border border-gray-300 rounded bg-white autocomplete-list max-h-60 overflow-y-auto list-none">
      {data.map((option) => (
        <SuggestionItem
          key={option.id}
          label={option.label}
          query={query}
          onSelect={() => onSelect(option)}
        />
      ))}
    </ul>
  )
}

export default AutoCompleteList
