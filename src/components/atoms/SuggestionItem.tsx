import React from 'react'

interface SuggestionItemProps {
  label: string
  query: string
  onSelect: () => void
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({
  label,
  query,
  onSelect,
}) => {
  const getHighlightedText = (
    text: string,
    highlight: string,
  ): JSX.Element[] => {
    if (!highlight) return [<span key="text">{text}</span>]

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="font-bold text-blue-500">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      ),
    )
  }
  return (
    <li onClick={onSelect} className="p-2 hover:bg-gray-100 cursor-pointer">
      {getHighlightedText(label, query)}
    </li>
  )
}

export default SuggestionItem
