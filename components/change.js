import React from 'react'
import Link from 'next-translate/Link'
import useTranslation from 'next-translate/useTranslation'
import i18nConfig from '../i18n.json'

const { allLanguages } = i18nConfig

function ChangeLanguage() {
  const { t, lang } = useTranslation()

  return allLanguages.map((lng) => {
    if (lng === lang) return null

    // Or you can attach the current pathname at the end
    // to keep the same page
    return (
      <Link href="/" lang={lng} key={lng}>
        {t(`layout:language-name-${lng}`)}
      </Link>
    )
  })
}

export default ChangeLanguage