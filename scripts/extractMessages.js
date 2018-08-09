/* eslint-disable import/no-extraneous-dependencies */

import * as fs from 'fs'
import { sync as globSync } from 'glob'
import { sync as mkdirpSync } from 'mkdirp'
import { transform } from 'babel-core'

import {
  appLocales,
  DEFAULT_LOCALE, // DEFAULT_LOCALE should match defaultMessage (in our case, english)
} from '../src/i18n'

const TRANSLATIONS_DIRECTORY = 'src/i18n/translations'

// If translations directory does not exist, create it
mkdirpSync(TRANSLATIONS_DIRECTORY)

const FILES_TO_PARSE = 'src/**/!(*.test).{js,jsx}'

const babelConfig = {
  presets: ['env', 'react'],
  plugins: [
    'dynamic-import-node',
    ['module-resolver', {
      extensions: ['.js', '.jsx'],
      root: ['./src'],
      alias: {
        assets: './assets',
      },
    }],
    'react-intl',
    'styled-components',
    'transform-class-properties',
    'transform-object-rest-spread',
  ],
}

// Store existing translations in memory
const oldLocaleMappings = []
const localeMappings = []

appLocales.forEach((locale) => {
  oldLocaleMappings[locale] = {}
  localeMappings[locale] = {}
  const translationFileName = `${TRANSLATIONS_DIRECTORY}/${locale}.json`
  try {
    const messages = JSON.parse(fs.readFileSync(translationFileName))
    const messageKeys = Object.keys(messages)
    messageKeys.forEach((messageKey) => {
      oldLocaleMappings[locale][messageKey] = messages[messageKey]
    })
  } catch (error) {
    if (error.code !== 'ENOENT') {
      process.stderr.write(`There was an error loading this translation file: ${translationFileName}`)
    }
  }
})

// Parse src files
globSync(FILES_TO_PARSE)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .forEach((code) => {
    const { metadata: result } = transform(code, babelConfig)
    const { messages } = result['react-intl']
    messages.forEach((message) => {
      appLocales.forEach((locale) => {
        const oldLocaleMapping = oldLocaleMappings[locale][message.id]
        // Merge old translations into the babel extracted instances
        const newMsg = (locale === DEFAULT_LOCALE) ? message.defaultMessage : ''
        localeMappings[locale][message.id] = oldLocaleMapping || newMsg
      })
    })
  })

// Save messages
appLocales.forEach((locale) => {
  const messages = {}
  Object.keys(localeMappings[locale])
    .sort()
    .forEach((key) => {
      messages[key] = localeMappings[locale][key]
    })
  const prettified = `${JSON.stringify(messages, null, 2)}\n`
  const translationFileName = `${TRANSLATIONS_DIRECTORY}/${locale}.json`
  try {
    fs.writeFileSync(translationFileName, prettified)
  } catch (error) {
    process.stderr.write(`There was an error loading this translation file: ${translationFileName}`)
  }
})
