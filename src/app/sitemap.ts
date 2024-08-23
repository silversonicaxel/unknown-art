import type { MetadataRoute } from 'next'

import { SITE_BASE_URL } from 'src/helpers/config/site'


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_BASE_URL,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE_BASE_URL}en/`,
          it: `${SITE_BASE_URL}it/`,
        }
      }
    },
    {
      url: `${SITE_BASE_URL}places`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${SITE_BASE_URL}en/places`,
          it: `${SITE_BASE_URL}it/places`,
        }
      }
    }
  ]
}
