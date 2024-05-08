'use client'

import { useMemo } from 'react'


type UsePaginationParams = {
  itemsPerPage: number
  maxPaginators: number
  totalItems: number
  currentPage: number
}

type UsePaginationResult = {
  startPage: number
  endPage: number
  rangePages: number[]
}

type UsePaginationHook = (params: UsePaginationParams) => UsePaginationResult

export const usePagination: UsePaginationHook = (params) => {
  const { itemsPerPage, maxPaginators, totalItems, currentPage } = params

  return useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    let startPage, endPage

    if (totalPages <= maxPaginators) {
      startPage = 1
      endPage = totalPages
    } else {
      const maxVisiblePages = Math.floor(maxPaginators / 2)
      if (currentPage <= maxVisiblePages) {
        startPage = 1
        endPage = maxPaginators
      } else if (currentPage + maxVisiblePages >= totalPages) {
        startPage = totalPages - maxPaginators + 1
        endPage = totalPages
      } else {
        startPage = currentPage - maxVisiblePages
        endPage = currentPage + maxVisiblePages
      }
    }

    return {
      startPage,
      endPage,
      rangePages: Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage)
    }
  }, [maxPaginators, currentPage, totalItems, itemsPerPage])
}
