import type { MetadataRoute } from 'next'

import { defaultLocale } from 'helpers/config/i18n'
import { meta } from 'helpers/config/meta'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'
import type { MetaIcon, MetaManifestIcon } from 'types/meta'


const getFlattenIcons = (icons: Record<string, MetaIcon[]>): MetaManifestIcon[] => {
  return Object
    .values(icons).reduce<MetaManifestIcon[]>((acc, array) => {
      const transformedArray = array.map(item => ({
        src: item.url,
        sizes: item.sizes,
        type: item.type
      }))
      return acc.concat(transformedArray)
    }, [])
}

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { t } = await getTranslationServer({ locale: defaultLocale, namespace: 'common' })

  return {
    name: meta.siteName,
    short_name: meta.siteName,
    description: t('description'),
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: getFlattenIcons(meta.siteIcons),
  }
}
