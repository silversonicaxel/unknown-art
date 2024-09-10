import acceptLanguage from 'accept-language'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, locales, I18N_COOKIE_NAME } from './helpers/config/i18n'


acceptLanguage.languages([...locales])

/* eslint-disable max-len */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|assets|favicon.ico|favicon.*\.png|android.*\.png|apple.*\.png|sw.js|site.webmanifest).*)']
}
/* eslint-enable */

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { cookies, headers, nextUrl, url } = request

  const response = NextResponse.next()

  const exceptionPaths = ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest']
  if (exceptionPaths.some(path => nextUrl.pathname.startsWith(path))) {
    return response
  }

  let locale
  if (cookies.has(I18N_COOKIE_NAME)) {
    locale = acceptLanguage.get(cookies.get(I18N_COOKIE_NAME)?.value)
  }
  if (!locale) {
    locale = acceptLanguage.get(headers.get('Accept-Language'))
  }
  if (!locale) {
    locale = defaultLocale
  }

  if (
    !locales.some(loc => nextUrl.pathname.startsWith(`/${loc}`)) &&
    !nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${locale}${nextUrl.pathname}`, url))
  }

  if (headers.has('referer')) {
    const referer = headers.get('referer')

    if (referer !== null) {
      const refererUrl = new URL(referer)
      const localeInReferer = locales.find((loc) => refererUrl.pathname.startsWith(`/${loc}`))

      if (localeInReferer) {
        response.cookies.set(I18N_COOKIE_NAME, localeInReferer)
      }

      return response
    }
  }

  return response
}
