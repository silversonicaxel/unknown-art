'use client'

import { usePathname, useParams, useSearchParams } from 'next/navigation'
import type { FC } from 'react'

import styles from './pagination-item.module.css'

import { useTranslationClient } from 'src/hooks/useTranslationClient'


type PaginationItemProps = {
  indexPage: number
}

export const PaginationItem: FC<PaginationItemProps> = ({ indexPage }) => {
  const params = useParams()
  const { t } = useTranslationClient({
    locale: params.locale as string,
    namespace: 'translation'
  })

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
        aria-label={`${t('common_pagination.current_page')} ${indexPage}`}
      >
        {indexPage}
      </span>
    )
  }

  return (
    <a
      className={`${styles.uapaginationitem} ${styles.uapaginationitem__link}`}
      href={createPageURL(indexPage)}
      aria-label={`${t('common_pagination.page')} ${indexPage}`}
    >
      {indexPage}
    </a>
  )
}
