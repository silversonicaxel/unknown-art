'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import { Pagination } from '../pagination'

import styles from './search-results.module.css'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import type { Bookshop } from 'src/types/bookshop'
import type { CountryCode } from 'types/country'
import type { I18nLocale } from 'types/i18n'


type SearchResultsProps = {
  bookshops: Bookshop[]
  totalBookshops: number,
  countryCodes: CountryCode
}

export const SearchResults: FC<SearchResultsProps> = (
  { bookshops, totalBookshops, countryCodes }
) => {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'bookshops' })

  if (bookshops.length > 0 && totalBookshops > 0) {
    return (
      <>
        {bookshops.map((bookshop) => (
          <div key={`bookshop-${bookshop.id}`} className={styles.uasearchresults__item}>
            <Link href={`/${locale}/bookshops/${bookshop.id}`}>
              <span>{bookshop.name}</span>
              &nbsp;
              <span className={styles['uasearchresults__item-separator']}>~~</span>
              &nbsp;
              <span>
                {bookshop.city ? `${bookshop.city} - ` : ``}
                {countryCodes[bookshop.iso]}
              </span>
            </Link>
          </div>
        ))}

        <Pagination totalItems={totalBookshops} />
      </>
    )
  }

  if (bookshops.length === 0 && totalBookshops > 0) {
    return <p className={styles.uasearchresults__notfound}>{t('results.wrongpagination')}</p>
  }

  return <p className={styles.uasearchresults__notfound}>{t('results.notfound')}</p>
}
