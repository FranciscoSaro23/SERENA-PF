import React from 'react'
interface ButtonProps {
  children: React.ReactNode
  primary?: boolean
  secondary?: boolean
  small?: boolean
  className?: string
  onClick?: () => void
}
export function Button({
  children,
  primary = false,
  secondary = false,
  small = false,
  className = '',
  onClick,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-full text-center'
  const sizeClasses = small ? 'text-xs py-1 px-3' : 'py-2 px-6'
  let colorClasses = 'bg-gray-200 text-gray-800'
  if (primary) {
    colorClasses = 'bg-[#0F1170] text-white'
  } else if (secondary) {
    colorClasses = 'bg-blue-100 text-[#0F1170]'
  }
  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
