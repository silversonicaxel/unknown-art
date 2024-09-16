# Contributing

If you are reading this it means that you are interested to make unknown-art a better club. So, first of all, thank you.

## New Pull Request

It can be based on an open issue, but also on a spontaneous submission. If the issue is missing from the [issues page](https://github.com/silversonicaxel/unknown-art/issues), please create a new one, in order to allow me to better understand the scope of the new code.

## New Language

- create inside folder `locales` a new language folder, named after two digits _Language Code_, based on the BCP 47 format.
- replicate the same files and data structure, getting inspired by the default English `en` language code, or any other language you could prefer, and translate all locales into the new language.
- update the file `src/helpers/config/i18n.ts` in the following configuration:
  - `locales` needs to include the new BCP 47 format language code.
  - `locales_regional_codes` needs to include a new key-value pair to associate the language code with its corresponding regional code.
- create a new PR and wait for feedback.
