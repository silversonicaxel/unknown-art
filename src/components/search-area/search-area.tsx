'use client'

import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useCallback } from 'react'
import type { DefaultValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { SearchAreaSummary } from './search-area-summary'
import styles from './search-area.module.css'

import { useTranslationClient } from 'helpers/hooks/useTranslationClient'
import { filterObjectEmptyValues } from 'helpers/utils/filterObjectEmptyValues'
import { isObjectNull } from 'helpers/utils/isObjectNull'
import { DialogLazy } from 'src/components/dialog'
import { useDialog } from 'src/components/dialog/hooks/useDialog'
import { CountryCode } from 'types/country'
import { I18nLocale } from 'types/i18n'
import { SearchBookshopsFormInput } from 'types/search'


type SearchAreaProps = {
  countries: CountryCode
  totalBookshops: number
}

export const SearchArea: FC<SearchAreaProps> = ({ countries, totalBookshops }) => {
  const params = useParams()
  const locale = params.locale as I18nLocale
  const { t } = useTranslationClient({ locale, namespace: 'common' })

  const id = 'search-bookshops'
  const title = t('search.title')
  const description = t('search.description')

  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const queryParams = searchParams.get('query')
  const queryValuesParams = queryParams ? JSON.parse(queryParams) : {}

  const defaultValues: DefaultValues<SearchBookshopsFormInput> = {
    name: queryValuesParams.name ?? null,
    iso: queryValuesParams.iso ?? null,
    city: queryValuesParams.city ?? null,
    website: queryValuesParams.website ?? '',
  }

  const { dialogProps, openDialog, closeDialog, toRender } = useDialog({ id })

  const { handleSubmit, register, reset, watch } =
    useForm<SearchBookshopsFormInput>({ defaultValues })

  const onSubmit = useCallback((data: SearchBookshopsFormInput) => {
    if (isObjectNull(data)) {
      replace(pathname)
    }
    else {
      const params = new URLSearchParams(searchParams)
      params.set('query', JSON.stringify(filterObjectEmptyValues(data)))
      params.delete('page')

      replace(`${pathname}?${params.toString()}`)
    }

    closeDialog()
  }, [closeDialog, pathname, replace, searchParams])

  const onReset = useCallback(() => {
    const emptyValues = {
      name: null,
      iso: null,
      city: null,
      website: '',
    }

    reset(emptyValues)
    onSubmit(emptyValues)
  }, [onSubmit, reset])

  const watchedIso = watch('iso')

  return (
    <>
      <SearchAreaSummary
        totalBookshops={totalBookshops}
        values={defaultValues}
        valuesOptions={{ iso: countries }}
        resetSearch={onReset}
        openDialogSearch={openDialog}
      />

      <DialogLazy
        {...dialogProps}
        toRender={toRender}
      >
        <div className={styles.uasearcharea__dialog}>
          <button
            className={styles['uasearcharea__dialog-close']}
            onClick={closeDialog}
            aria-label={t('search.action.close.label')}
            tabIndex={7}
          />

          <h3 id={dialogProps['aria-labelledby']}>{title}</h3>
          <p id={dialogProps['aria-describedby']}>{description}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles['uasearcharea__dialog-fieldset']}>
              <input
                className={styles['uasearcharea__dialog-input']}
                id="search-name"
                {...register('name')}
                placeholder={t('search.field.name.label')}
                tabIndex={1}
                data-1p-ignore
              />

              <select
                className={`${styles['uasearcharea__dialog-select']} ${watchedIso
                  ? '' : styles['uasearcharea__dialog-select--unselected']}`}
                id="search-iso"
                {...register('iso')}
                tabIndex={2}
              >
                <option value="">{t('search.field.country.label')}</option>
                {Object.entries(countries)
                  .sort(([, countryA], [, countryB]) => countryA.localeCompare(countryB))
                  .map(([code, country]) => {
                    return (<option key={`${code}-${country}`} value={code}>{country}</option>)
                  })
                }
              </select>

              <input
                className={styles['uasearcharea__dialog-input']}
                id="search-city"
                {...register('city')}
                placeholder={t('search.field.city.label')}
                tabIndex={3}
                data-1p-ignore
              />

              <div className={styles['uasearcharea__dialog-group']}>
                <div className={styles['uasearcharea__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearcharea__dialog-multichoice']}
                    id="search-all-website"
                    {...register('website')}
                    tabIndex={4}
                    value={''}
                  />
                  <label
                    className={styles['uasearcharea__dialog-label']}
                    htmlFor="search-all-website"
                  >
                    {t('search.field.website.option.all')}
                  </label>
                </div>

                <div className={styles['uasearcharea__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearcharea__dialog-multichoice']}
                    id="search-with-website"
                    {...register('website')}
                    tabIndex={4}
                    value={'with'}
                  />
                  <label
                    className={styles['uasearcharea__dialog-label']}
                    htmlFor="search-with-website"
                  >
                    {t('search.field.website.option.with')}
                  </label>
                </div>

                <div className={styles['uasearcharea__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearcharea__dialog-multichoice']}
                    id="search-without-website"
                    {...register('website')}
                    tabIndex={4}
                    value={'without'}
                  />
                  <label
                    className={styles['uasearcharea__dialog-label']}
                    htmlFor="search-without-website"
                  >
                    {t('search.field.website.option.without')}
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className={styles['uasearcharea__dialog-submit']}
              aria-describedby={dialogProps['aria-describedby']}
              aria-label={t('search.action.submit.label')}
              tabIndex={6}
            >
              {t('search.action.submit.title')}
            </button>

            <button
              type="button"
              className={styles['uasearcharea__dialog-reset']}
              aria-label={t('search.action.reset.label')}
              onClick={onReset}
              tabIndex={5}
            >
              {t('search.action.reset.title')}
            </button>
          </form>
        </div>
      </DialogLazy>
    </>
  )
}
