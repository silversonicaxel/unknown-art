import { META_SITE_BASE_URL } from 'helpers/config/meta'
import type { MetadataRoute } from 'next'


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
      url: `${META_SITE_BASE_URL}bookshop`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${META_SITE_BASE_URL}en/bookshops`,
          it: `${META_SITE_BASE_URL}it/bookshops`,
        }
      }
    }
  ]
}
