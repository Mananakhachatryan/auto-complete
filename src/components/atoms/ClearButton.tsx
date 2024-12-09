import React from 'react'

interface ClearButtonProps {
  onClick: () => void
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-3 text-gray-500 hover:text-gray-700"
    aria-label="Clear input"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
)

export default ClearButton
