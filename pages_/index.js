import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'
import Change from '../components/change'

function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>home</h1>
      <div>{t('common:title')}</div>
      <Link href="/about-us" passHref>
        <a>about us</a>
      </Link>
      <div>
        <Change />
      </div>
    </div>
  )
}

export default Home
