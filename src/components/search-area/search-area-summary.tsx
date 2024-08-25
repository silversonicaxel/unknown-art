'use client'

import { useParams } from 'next/navigation'
import type { FC } from 'react'

import { SearchAreaSummaryItem } from './search-area-summary-item'
import styles from './search-area-summary.module.css'

import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { isObjectNull } from 'src/helpers/utils/isObjectNull'
import { SearchPlacesFormInput, SearchPlacesFormInputOptions } from 'src/types/search'


type SearchAreaSummaryProps = {
  values: SearchPlacesFormInput
  valuesOptions: SearchPlacesFormInputOptions
  resetSearch: () => void
  openDialogSearch: () => void
}

export const SearchAreaSummary: FC<SearchAreaSummaryProps> = ({
  values,
  valuesOptions,
  resetSearch,
  openDialogSearch
}) => {
  const params = useParams()
  const locale = params.locale as string
  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <div className={styles.uasearchareasummary}>
      <SearchAreaSummaryItem
        className={styles.uasearchareasummary__item}
        label={t('search.field.name.label')}
        value={values.name}
      />
      <SearchAreaSummaryItem
        className={styles.uasearchareasummary__item}
        label={t('search.field.country.label')}
        value={values.iso}
        options={valuesOptions.iso}
      />
      <SearchAreaSummaryItem
        className={styles.uasearchareasummary__item}
        label={t('search.field.city.label')}
        value={values.city}
      />
      <SearchAreaSummaryItem
        className={styles.uasearchareasummary__item}
        label={t('search.field.website.label')}
        value={values.website}
      />

      {!isObjectNull(values) &&
        (<button
          className={styles.uasearchareasummary__item}
          aria-label={t('search.action.reset.label')}
          onClick={resetSearch}
        >
          {t('search.action.reset.title')}
        </button>)
      }
      <button
        className={styles.uasearchareasummary__item}
        aria-label={t('search.action.dialog.label')}
        onClick={openDialogSearch}
      >
        {t('search.action.dialog.title')}
      </button>
    </div>
  )
}
