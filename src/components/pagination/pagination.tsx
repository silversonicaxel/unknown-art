'use client'

import { PAGINATION_LIMIT, PAGINATION_MAX_ITEMS } from 'helpers/config/pagination'
import { usePagination } from 'helpers/hooks/usePagination'
import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { PaginationItem } from './pagination-item'
import styles from './pagination.module.css'


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
