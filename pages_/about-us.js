import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'

function AboutUs() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>AboutUs</h1>
      <div>{t('common:about-us')}</div>
      <Link href="/" passHref>
        <a>homepage</a>
      </Link>
    </div>
  )
}

export default AboutUs
