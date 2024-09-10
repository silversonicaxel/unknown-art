import { defaultLocale } from 'src/helpers/config/i18n'
import { getTranslationServer } from 'src/helpers/utils/getTranslationServer'


export const NotFoundContentServer = async () => {
  const { t } = await getTranslationServer({ locale: defaultLocale, namespace: 'common' })

  return (
    <>
      <h1>{t('title')}</h1>

      <p>{t('notfound.description')}</p>
    </>
  )
}
