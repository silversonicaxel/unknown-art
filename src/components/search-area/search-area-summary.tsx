'use client'

import { useParams } from 'next/navigation'
import type { FC } from 'react'

import { SearchAreaSummaryItem } from './search-area-summary-item'
import styles from './search-area-summary.module.css'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { isObjectNull } from 'helpers/utils/isObjectNull'
import { I18nLocale } from 'types/i18n'
import { SearchPlacesFormInput, SearchPlacesFormInputOptions } from 'types/search'


type SearchAreaSummaryProps = {
  totalPlaces: number
  values: SearchPlacesFormInput
  valuesOptions: SearchPlacesFormInputOptions
  resetSearch: () => void
  openDialogSearch: () => void
}

export const SearchAreaSummary: FC<SearchAreaSummaryProps> = ({
  totalPlaces,
  values,
  valuesOptions,
  resetSearch,
  openDialogSearch
}) => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'common' })

  return (
    <div className={styles.uasearchareasummary}>
      <SearchAreaSummaryItem
        label={t('search.field.total.label')}
        value={totalPlaces.toString()}
      />
      <SearchAreaSummaryItem
        label={t('search.field.name.label')}
        value={values.name}
      />
      <SearchAreaSummaryItem
        label={t('search.field.country.label')}
        value={values.iso}
        options={valuesOptions.iso}
      />
      <SearchAreaSummaryItem
        label={t('search.field.city.label')}
        value={values.city}
      />
      <SearchAreaSummaryItem
        label={t('search.field.website.label')}
        value={values.website}
      />

      <div className={styles.uasearchareasummary__buttons}>
        {!isObjectNull(values) &&
          (<button
            aria-label={t('search.action.reset.label')}
            onClick={resetSearch}
          >
            {t('search.action.reset.title')}
          </button>)
        }
        <button
          aria-label={t('search.action.dialog.label')}
          onClick={openDialogSearch}
        >
          {t('search.action.dialog.title')}
        </button>
      </div>
    </div>
  )
}
