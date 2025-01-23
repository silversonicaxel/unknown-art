const glob = require('glob')
const fsExtra = require('fs-extra')

async function checkTranslations() {
  const DEFAULT_LANGUAGE = 'en'

  const DIR_LANGUAGES = './locales'

  let totalIssues = 0
  let languageIssues = 0
  let exitCode = 0

  const getOtherLanguages = () => {
    return fsExtra
      .readdirSync(DIR_LANGUAGES)
      .filter((dir) => fsExtra.statSync(`${DIR_LANGUAGES}/${dir}`).isDirectory())
      .filter((dir) => dir !== DEFAULT_LANGUAGE)
      .map((language) => language.toLowerCase())
  }

  const checkKeys = (defaultLanguageData, otherLanguageData, prefix = '', otherLanguage) => {
    if (!defaultLanguageData || typeof defaultLanguageData !== 'object') {
      return
    }

    if (!otherLanguageData || typeof otherLanguageData !== 'object') {
      return
    }

    const defaultLanguageKeys = new Set(Object.keys(defaultLanguageData))
    const otherLanguagesKeys = new Set(Object.keys(otherLanguageData))

    for (const defaultLanguageKey of defaultLanguageKeys) {
      if (!otherLanguagesKeys.has(defaultLanguageKey)) {
        console.error(`Missing key: ${prefix ? `${prefix}.${defaultLanguageKey}` : defaultLanguageKey} in language "${otherLanguage}"`)
        totalIssues++
      }
    }

    for (const langKey of otherLanguagesKeys) {
      if (!defaultLanguageKeys.has(langKey)) {
        console.error(`Extra key: ${prefix ? `${prefix}.${langKey}` : langKey} in language "${otherLanguage}"`)
        totalIssues++
      }
    }

    for (const commonKey of [...defaultLanguageKeys].filter((key) => typeof defaultLanguageData[key] === 'object')) {
      checkKeys(defaultLanguageData[commonKey], otherLanguageData[commonKey], prefix ? `${prefix}.${commonKey}` : commonKey, otherLanguage)
    }
  }

  console.info(`\nChecking default language: ${DEFAULT_LANGUAGE}...`)

  const defaultLanguageFiles = glob.sync(`./locales/${DEFAULT_LANGUAGE}/*.json`)
  const otherLanguages = getOtherLanguages()

  for (const language of otherLanguages) {
    console.info(`\nChecking other language: ${language}...`)

    const defaultLanguageData = {}
    await Promise.all(
      defaultLanguageFiles.map(async (file) => {
        try {
          const data = await fsExtra.readJson(file, 'utf8')
          const key = file.replace(`locales/${DEFAULT_LANGUAGE}/`, '').replace('.json', '')
          defaultLanguageData[key] = data
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.error(`\nNo default language file found: ${file}`)
          } else {
            throw err
          }
        }
      })
    )

    // Load language-specific files and check keys recursively
    const languageFiles = glob.sync(`./locales/${language}/*.json`)
    await Promise.all(
      languageFiles.map(async (file) => {
        try {
          const data = await fsExtra.readJson(file, 'utf8')
          const key = file.replace(`locales/${language}/`, '').replace('.json', '')
          checkKeys(defaultLanguageData[key], data, key, language)
        } catch (error) {
          if (err.code === 'ENOENT') {
            console.error(`\nNo language-specific file found: ${file}`)
          } else {
            throw error
          }
        }
      })
    )

    if (totalIssues > 0) {
      throw new Error(`\nFailed: found ${totalIssues} issues.`)
    }
  }
}

checkTranslations()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  })
