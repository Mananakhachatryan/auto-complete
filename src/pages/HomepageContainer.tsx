import React from 'react'
import AutoComplete from '@/components/atoms/AutoCompleteSearch'

const HomepageContainer: React.FC = () => {
  return (
    <div className="min-h-screen flex items-top justify-center bg-gray-50">
      <AutoComplete />
    </div>
  )
}

export default HomepageContainer
