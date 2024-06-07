'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import styles from './search-places-box.module.css'
import { SearchPlacesSummary } from './search-places-summary'

import { CodeCountry } from 'src/types/country'
import { SearchPlacesFormInput } from 'src/types/search'
import { isObjectNull } from 'src/utils/isObjectNull'
import { Dialog } from 'src/views/dialog'
import { useDialog } from 'src/views/dialog/hooks/useDialog'


type SearchPlacesBoxProps = {
  countries: CodeCountry
}

export const SearchPlacesBox: FC<SearchPlacesBoxProps> = ({ countries }) => {
  const id = 'search-places'
  const title = 'Search places'
  const description = 'Filter the list of places'

  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const queryParams = searchParams.get('query')
  const queryValuesParams = queryParams ? JSON.parse(queryParams) : {}

  const defaultValues = {
    name: queryValuesParams.name ?? undefined,
    iso: queryValuesParams.iso ?? undefined,
    city: queryValuesParams.city ?? undefined,
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
          label="name"
          value={defaultValues.name}
        />
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label="country"
          value={defaultValues.iso}
          options={countries}
        />
        <SearchPlacesSummary
          className={styles.uasearchplacesbox__item}
          label="city"
          value={defaultValues.city}
        />

        <a
          role="button"
          className={styles.uasearchplacesbox__item}
          onClick={openDialog}
        >
          search
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
            aria-label="Close search places dialog"
          />

          <h3 id={dialogProps['aria-labelledby']}>{title}</h3>
          <p id={dialogProps['aria-describedby']}>{description}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={styles['uasearchplacesbox__dialog-fieldset']}>
              <input
                className={styles['uasearchplacesbox__dialog-input']}
                {...register('name')}
                placeholder="name"
                data-1p-ignore
              />

              <select
                className={`${styles['uasearchplacesbox__dialog-select']} ${watchedIso
                  ? '' : styles['uasearchplacesbox__dialog-select--unselected']}`}
                {...register('iso')}
              >
                <option value="">country</option>
                {Object.entries(countries)
                  .sort(([, countryA], [, countryB]) => countryA.localeCompare(countryB))
                  .map(([code, country]) => {
                    return (<option key={`${code}-${country}`} value={code}>{country}</option>)
                  })
                }
              </select>

              <input
                className={styles['uasearchplacesbox__dialog-input']}
                {...register('city')}
                placeholder="city"
                data-1p-ignore
              />
            </fieldset>

            <button
              type="submit"
              className={styles['uasearchplacesbox__dialog-submit']}
              aria-describedby={dialogProps['aria-describedby']}
              aria-label="Submit the search of places"
            >
              search
            </button>

            <button
              type="reset"
              className={styles['uasearchplacesbox__dialog-reset']}
              aria-label="Reset the search of places"
              onClick={onReset}
            >
              reset
            </button>
          </form>
        </div>
      </Dialog>
    </>
  )
}

SearchPlacesBox.displayName = 'SearchPlacesBox'
