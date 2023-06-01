import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'shared/ui/Page/Page'

const AboutPage: FC = () => {
  const { t } = useTranslation('about')
  return (
    <Page>
      {t('О нас')}
    </Page>
  )
}

export default memo(AboutPage)
