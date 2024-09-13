import { defaultLocale } from 'helpers/config/i18n'
import { getTranslationServer } from 'helpers/utils/getTranslationServer'


export const NotFoundContentServer = async () => {
  const { t } = await getTranslationServer({ locale: defaultLocale, namespace: 'common' })

  return (
    <>
      <h1>{t('title')}</h1>

      <p>{t('notfound.description')}</p>
    </>
  )
}
