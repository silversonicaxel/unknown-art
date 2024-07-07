'use client'

import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import styles from './search-places-box.module.css'
import { SearchPlacesSummary } from './search-places-summary'

import { Dialog } from 'src/components/dialog'
import { useDialog } from 'src/components/dialog/hooks/useDialog'
import { useTranslationClient } from 'src/helpers/hooks/useTranslationClient'
import { isObjectNull } from 'src/helpers/utils/isObjectNull'
import { CodeCountry } from 'src/types/country'
import { SearchPlacesFormInput } from 'src/types/search'


type SearchPlacesBoxProps = {
  countries: CodeCountry
}

export const SearchPlacesBox: FC<SearchPlacesBoxProps> = ({ countries }) => {
  const params = useParams()
  const { t } = useTranslationClient({
    locale: params.locale as string,
    namespace: 'translation'
  })

  const id = 'search-places'
  const title = t('common_search.title')
  const description = t('common_search.description')

  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const queryParams = searchParams.get('query')
  const queryValuesParams = queryParams ? JSON.parse(queryParams) : {}

  const defaultValues = {
    name: queryValuesParams.name ?? undefined,
    iso: queryValuesParams.iso ?? undefined,
    city: queryValuesParams.city ?? undefined,
    website: queryValuesParams.website ?? '',
  }

  const { dialogProps, openDialog, closeDialog, toRender } = useDialog({ id })

  const { handleSubmit, register, reset, watch } = useForm<SearchPlacesFormInput>({ defaultValues })

  const onSubmit = useCallback((data: SearchPlacesFormInput) => {
    if (isObjectNull(data)) {
      replace(pathname)
    }
    else {
      const params = new URLSearchParams(searchParams)
      params.set('query', JSON.stringify(data))
      params.delete('page')

      replace(`${pathname}?${params.toString()}`)
    }

    closeDialog()
  }, [closeDialog, pathname, replace, searchParams])

  const onReset = useCallback(() => {
    reset()
    onSubmit({})
  }, [onSubmit, reset])

  const watchedIso = watch('iso')

  return (
    <>
      <div className={styles.uasearchplacesbox}>
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label={t('common_search.field.name.label')}
          value={defaultValues.name}
        />
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label={t('common_search.field.country.label')}
          value={defaultValues.iso}
          options={countries}
        />
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label={t('common_search.field.city.label')}
          value={defaultValues.city}
        />
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label={t('common_search.field.website.label')}
          value={defaultValues.website}
        />

        {!isObjectNull(defaultValues) &&
          (<a
            className={styles.uasearchplacesbox__item}
            role="button"
            aria-label={t('common_search.action.reset.label')}
            onClick={onReset}
          >
            {t('common_search.action.reset.title')}
          </a>)
        }
        <a
          className={styles.uasearchplacesbox__item}
          role="button"
          aria-label={t('common_search.action.dialog.label')}
          onClick={openDialog}
        >
          {t('common_search.action.dialog.title')}
        </a>
      </div>

      <Dialog
        {...dialogProps}
        toRender={toRender}
        aria-labelledby={dialogProps['aria-labelledby']}
        aria-describedby={dialogProps['aria-describedby']}
        aria-modal="true"
      >
        <div className={styles.uasearchplacesbox__dialog}>
          <a
            role="button"
            className={styles['uasearchplacesbox__dialog-close']}
            onClick={closeDialog}
            aria-label={t('common_search.action.close.label')}
          />

          <h3 id={dialogProps['aria-labelledby']}>{title}</h3>
          <p id={dialogProps['aria-describedby']}>{description}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles['uasearchplacesbox__dialog-fieldset']}>
              <input
                className={styles['uasearchplacesbox__dialog-input']}
                id="search-name"
                {...register('name')}
                placeholder={t('common_search.field.name.label')}
                data-1p-ignore
              />

              <select
                className={`${styles['uasearchplacesbox__dialog-select']} ${watchedIso
                  ? '' : styles['uasearchplacesbox__dialog-select--unselected']}`}
                id="search-iso"
                {...register('iso')}
              >
                <option value="">{t('common_search.field.country.label')}</option>
                {Object.entries(countries)
                  .sort(([, countryA], [, countryB]) => countryA.localeCompare(countryB))
                  .map(([code, country]) => {
                    return (<option key={`${code}-${country}`} value={code}>{country}</option>)
                  })
                }
              </select>

              <input
                className={styles['uasearchplacesbox__dialog-input']}
                id="search-city"
                {...register('city')}
                placeholder={t('common_search.field.city.label')}
                data-1p-ignore
              />

              <div className={styles['uasearchplacesbox__dialog-group']}>
                <div className={styles['uasearchplacesbox__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearchplacesbox__dialog-multichoice']}
                    id="search-all-website"
                    {...register('website')}
                    value={''}
                  />
                  <label
                    className={styles['uasearchplacesbox__dialog-label']}
                    htmlFor="search-all-website"
                  >
                    {t('common_search.field.website.option.all')}
                  </label>
                </div>

                <div className={styles['uasearchplacesbox__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearchplacesbox__dialog-multichoice']}
                    id="search-with-website"
                    {...register('website')}
                    value={'with'}
                  />
                  <label
                    className={styles['uasearchplacesbox__dialog-label']}
                    htmlFor="search-with-website"
                  >
                    {t('common_search.field.website.option.with')}
                  </label>
                </div>

                <div className={styles['uasearchplacesbox__dialog-wrapper']}>
                  <input
                    type="radio"
                    className={styles['uasearchplacesbox__dialog-multichoice']}
                    id="search-without-website"
                    {...register('website')}
                    value={'without'}
                  />
                  <label
                    className={styles['uasearchplacesbox__dialog-label']}
                    htmlFor="search-without-website"
                  >
                    {t('common_search.field.website.option.without')}
                  </label>
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className={styles['uasearchplacesbox__dialog-submit']}
              aria-describedby={dialogProps['aria-describedby']}
              aria-label={t('common_search.action.submit.label')}
            >
              {t('common_search.action.submit.title')}
            </button>

            <button
              type="button"
              className={styles['uasearchplacesbox__dialog-reset']}
              aria-label={t('common_search.action.reset.label')}
              onClick={onReset}
            >
              {t('common_search.action.reset.title')}
            </button>
          </form>
        </div>
      </Dialog>
    </>
  )
}
