import React from 'react'
interface InputProps {
  placeholder: string
  type?: string
  className?: string
}
export function Input({
  placeholder,
  type = 'text',
  className = '',
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full py-2 px-4 bg-blue-50 rounded-full text-sm outline-none ${className}`}
    />
  )
}
