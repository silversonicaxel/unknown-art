'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './pagination-item.module.css'


type PaginationItemProps = {
  indexPage: number
}

export const PaginationItem: FC<PaginationItemProps> = ({ indexPage }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (indexPage === currentPage) {
    return (
      <span
        className={`${styles.uapaginationitem} ${styles.uapaginationitem__text}`}
      >
        {indexPage}
      </span>
    )
  }

  return (
    <a
      className={`${styles.uapaginationitem} ${styles.uapaginationitem__link}`}
      href={createPageURL(indexPage)}
    >
      {indexPage}
    </a>
  )
}
