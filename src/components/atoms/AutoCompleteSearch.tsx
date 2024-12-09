import React, { useState, useCallback, FocusEvent } from 'react'
import InputField from '@/components/atoms/InputField'
import ClearButton from '@/components/atoms/ClearButton'
import AutoCompleteList from '@/components/organisms/AutoCompleteList'
import { useAutoComplete } from '@/context/AutoCompleteContext'
import { Option } from '@/types/AutoCompleteTypes'

const AutoCompleteSearch: React.FC = () => {
  const [isListOpen, setIsListOpen] = useState(false)
  const { autoCompleteData, query, setQuery } = useAutoComplete()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  const handleInputBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget || !e.relatedTarget.closest('.autocomplete-list')) {
      setTimeout(() => setIsListOpen(false), 100)
    }
  }, [])

  const handleInputClick = () => {
    setIsListOpen(true)
  }

  const handleOptionSelect = (option: Option) => {
    setQuery(option.label)
    setSelectedOption(option.label)
    setIsListOpen(false)
  }

  const handleClearInput = () => {
    setQuery('')
    setSelectedOption(null)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="mb-4 text-lg font-semibold">
        Selected Country: {selectedOption}
      </h2>
      <div className="w-full relative">
        <InputField
          value={query}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
        />
        {query && <ClearButton onClick={handleClearInput} />}
      </div>
      {isListOpen && (
        <AutoCompleteList
          data={autoCompleteData}
          query={query}
          onSelect={handleOptionSelect}
        />
      )}
    </div>
  )
}

export default AutoCompleteSearch
