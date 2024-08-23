import type { MetadataRoute } from 'next'

import { meta } from 'src/helpers/config/meta'
import type { MetaIcon, MetaManifestIcon } from 'src/types/meta'


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

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: meta.siteName,
    short_name: meta.siteName,
    description: meta.siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: getFlattenIcons(meta.siteIcons),
  }
}
