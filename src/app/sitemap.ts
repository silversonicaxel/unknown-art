import type { MetadataRoute } from 'next'

import { META_SITE_BASE_URL } from 'helpers/config/meta'


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: META_SITE_BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${META_SITE_BASE_URL}en/`,
          it: `${META_SITE_BASE_URL}it/`,
        }
      }
    },
    {
      url: `${META_SITE_BASE_URL}places`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${META_SITE_BASE_URL}en/places`,
          it: `${META_SITE_BASE_URL}it/places`,
        }
      }
    }
  ]
}
