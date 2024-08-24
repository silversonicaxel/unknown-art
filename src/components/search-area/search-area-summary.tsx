'use client'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { isObjectNull } from 'helpers/utils/isObjectNull'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import type { I18nLocale } from 'types/i18n'
import type { SearchBookshopsFormInput, SearchBookshopsFormInputOptions } from 'types/search'
import { SearchAreaSummaryItem } from './search-area-summary-item'
import styles from './search-area-summary.module.css'


type SearchAreaSummaryProps = {
  totalBookshops: number
  values: SearchBookshopsFormInput
  valuesOptions: SearchBookshopsFormInputOptions
  resetSearch: () => void
  openDialogSearch: () => void
}

export const SearchAreaSummary: FC<SearchAreaSummaryProps> = ({
  totalBookshops,
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
        value={totalBookshops.toString()}
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
