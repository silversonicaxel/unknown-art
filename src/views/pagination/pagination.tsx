'use client'

import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'

import { PaginationItem } from './pagination-item'
import styles from './pagination.module.css'

import { PAGINATION_LIMIT, PAGINATION_MAX_ITEMS } from 'src/config/pagination'
import { usePagination } from 'src/hooks/usePagination'


type PaginationProps = {
  totalItems: number
}

export const Pagination: FC<PaginationProps> = ({ totalItems }) => {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  
  const pagination = usePagination({ 
    itemsPerPage: PAGINATION_LIMIT,
    maxPaginators: PAGINATION_MAX_ITEMS,
    totalItems, 
    currentPage, 
  })

  if(totalItems <= PAGINATION_LIMIT) {
    return null
  }

  const { rangePages } = pagination
    
  return (
    <div className={styles.uapagination}>
      {rangePages.map((pageItem) => (
        <PaginationItem indexPage={pageItem} key={`pagination-item-${pageItem}`}/>
      ))}
    </div>
  )
}
