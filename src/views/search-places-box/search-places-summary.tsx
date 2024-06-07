'use client'

import type { FC } from 'react'


type SearchPlacesSummaryProps = {
  label: string
  value: string
  options?: Record<string, string>
  className?: string
}

export const SearchPlacesSummary: FC<SearchPlacesSummaryProps> = ({
  label,
  value,
  options,
  className,
}) => {
  if (!value) {
    return null
  }

  return (
    <span className={className}>
      {label}: {options ? options[value] : value}
    </span>
  )
}
