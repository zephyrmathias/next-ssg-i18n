import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'; 

const lang = ["de", "fr"]

const cookiesName = 'next-i18next'

function useLanguageDetection() {
  const router = useRouter()
  const [cookies, setCookie] = useCookies([]);

  useEffect(() => {
    const [, langQuery] = router.asPath.split('/')

    // go directly to a supported specific language (not include "en")
    // save cookies
    if (lang.some((l) => l === langQuery)) {
      cookies[cookiesName]
      setCookie(cookiesName, langQuery, { path: '/' })
      return
    }

    function getLangRoute(lang) {
      return {
        pathname: `/${lang}${router.pathname}`,
        query: router.query,
        asPath: `/${lang}${router.asPath}`,
      }
    }

    // come here = need to check for redirection

    // check from cookies
    if (cookies[cookiesName]) {

      // cookies in supported languages ==> redirect + save cookies
      if (lang.some((l) => l === cookies[cookiesName])) {
        setCookie(cookiesName, cookies[cookiesName], { path: '/' })
        const { pathname, asPath } = getLangRoute(cookies[cookiesName])
        router.replace(pathname, asPath)
        return
      }

      // "en" ==> no redirect
      if (cookies[cookiesName] === 'en') {
        return
      }
    }

    // whatever or no cookies ==> go check browser language

    // check from browser language
    const navLang = navigator.language || navigator.userLanguage || ''
    const userLang = navLang.split('-')[0]

    // if "en" --> no redirect + save cookies
    if (userLang === 'en') {
      setCookie(cookiesName, userLang, { path: '/' })
      return
    }

    // other --> redirect
    if (lang.some((l) => l === userLang)) {
      setCookie(cookiesName, userLang, { path: '/' })
      const { pathname, asPath } = getLangRoute(userLang)
      router.replace(pathname, asPath)
      return
    }

    // not match with anything
    // fallback to default language
    setCookie(cookiesName, 'en', { path: '/' })
  }, [])
}

export default function MyApp({ Component, pageProps }) {
  useLanguageDetection()
  return <Component {...pageProps} />
}