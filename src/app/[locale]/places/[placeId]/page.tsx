import fetchedMeta from 'fetch-meta-tags'
import type { fetchedMeta as FetchedMetadata } from 'fetch-meta-tags'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import styles from './place.module.css'

import { getPlace } from 'src/api/place'
import { SafeImage } from 'src/components/safe-image'
import { locales_regional_codes } from 'src/helpers/config/i18n'
import { meta, META_SITE_BASE_URL } from 'src/helpers/config/meta'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'
import { isImageSecure } from 'src/helpers/utils/isImageSecure'
import type { ComponentParams } from 'src/types/component'
import { I18nLocale } from 'src/types/i18n'


type PlacePageProps = {
  params: {
    placeId: string
  }
} & ComponentParams

type PlaceMeta = FetchedMetadata | null

export async function generateMetadata(
  { params: { placeId, locale } }: PlacePageProps
): Promise<Metadata | void> {
  const { t } = await getTranslationServer({ locale, namespace: 'common' })
  const place = await getPlace(placeId)
  if (place === null) {
    return
  }

  return {
    title: `${meta.siteName} _ ${t('menu.place')} _ ${place.name}`,
    openGraph: {
      title: `${meta.siteName} - ${t('menu.places')}`,
      description: t('description'),
      url: `${META_SITE_BASE_URL}${locale}/places/${place.id}`,
      siteName: meta.siteName,
      locale: locales_regional_codes[locale as I18nLocale],
      type: 'website',
    }
  }
}

export default async function PlacePage(
  { params: { placeId, locale } }: PlacePageProps
) {
  const { t } = await getTranslationServer({ locale, namespace: 'places' })

  const place = await getPlace(placeId)
  if (place === null) {
    notFound()
  }

  let placeMeta: PlaceMeta
  try {
    placeMeta = place.site ? await fetchedMeta(place.site) : null
  } catch {
    placeMeta = null
  }

  return (
    <>
      <h1>{place.name}</h1>
      <article className={styles.uaplace}>
        <section className={styles.uaplace_section}>
          <h4>{t('form.address')}</h4>

          <a
            href={place.address_url ? place.address_url : `https://www.google.com/maps/place/${place.address}`}
            target="_blank"
            rel="noreferrer"
          >
            {place.address}
          </a>
        </section>

        {place.site && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.website')}</h4>
            <a
              href={place.site}
              target="_blank"
              rel="noreferrer"
            >
              {place.site}
            </a>
          </section>
        )}

        {placeMeta?.image && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.description')}</h4>
            <p>{placeMeta.description}</p>
          </section>
        )}

        {placeMeta?.image && isImageSecure(placeMeta.image) && (
          <section className={styles.uaplace_section}>
            <h4>{t('form.image')}</h4>
            <SafeImage
              src={placeMeta.image}
              alt={place.name}
              aria-label={place.name}
            />
          </section>
        )}
      </article>
    </>
  )
}
