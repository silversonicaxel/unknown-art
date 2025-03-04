'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { usePathname, useParams, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import type { I18nLocale } from 'types/i18n'
import styles from './pagination-item.module.css'


type PaginationItemProps = {
  indexPage: number
}

export const PaginationItem: FC<PaginationItemProps> = ({ indexPage }) => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'common' })

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
        aria-label={`${t('pagination.current_page')} ${indexPage}`}
      >
        {indexPage}
      </span>
    )
  }

  return (
    <a
      className={`${styles.uapaginationitem} ${styles.uapaginationitem__link}`}
      href={createPageURL(indexPage)}
      aria-label={`${t('pagination.page')} ${indexPage}`}
    >
      {indexPage}
    </a>
  )
}
