import React, { ChangeEvent, FocusEvent } from 'react'

interface InputFieldProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  onBlur: (e: FocusEvent<HTMLInputElement>) => void
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onClick,
  onBlur,
  placeholder = 'Search...',
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    onClick={onClick}
    onBlur={onBlur}
    placeholder={placeholder}
    className="w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
  />
)

export default InputField
