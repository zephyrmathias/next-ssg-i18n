import useTranslation from 'next-translate/useTranslation'
import Link from 'next-translate/Link'

function AboutUs({ hello }) {
  const { t } = useTranslation()

  return (
    <div>
      <h1>AboutUs</h1>
      <div>{t('common:about-us')}</div>
      <Link href="/" passHref>
        <a>homepage</a>
      </Link>
      <div>{hello}</div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hello: Date.now(),
    },
    revalidate: 10,
  }
}

export default AboutUs
