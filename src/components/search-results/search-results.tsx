'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { FC } from 'react'

import { Pagination } from '../pagination'

import styles from './search-results.module.css'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import type { CountryCode } from 'src/types/country'
import { I18nLocale } from 'src/types/i18n'
import type { Place } from 'src/types/place'


type SearchResultsProps = {
  places: Place[]
  totalPlaces: number,
  countryCodes: CountryCode
}

export const SearchResults: FC<SearchResultsProps> = ({ places, totalPlaces, countryCodes }) => {
  const params = useParams()
  const locale = params.locale as I18nLocale

  const { t } = useTranslationClient({ locale, namespace: 'places' })

  if (places.length > 0 && totalPlaces > 0) {
    return (
      <>
        {places.map((place) => (
          <div key={`place-${place.id}`} className={styles.uasearchresults__item}>
            <Link href={`/${locale}/places/${place.id}`}>
              <span>{place.name}</span>
              &nbsp;
              <span className={styles['uasearchresults__item-separator']}>~~</span>
              &nbsp;
              <span>
                {place.city ? `${place.city} - ` : ``}
                {countryCodes[place.iso]}
              </span>
            </Link>
          </div>
        ))}

        <Pagination totalItems={totalPlaces} />
      </>
    )
  }

  if (places.length === 0 && totalPlaces > 0) {
    return <p className={styles.uasearchresults__notfound}>{t('results.wrongpagination')}</p>
  }

  return <p className={styles.uasearchresults__notfound}>{t('results.notfound')}</p>
}
