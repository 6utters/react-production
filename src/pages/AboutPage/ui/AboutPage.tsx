import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'

const AboutPage: FC = () => {
  const { t } = useTranslation('about')
  return (
    <Page data-testid="AboutPage">
      {t('О нас')}
    </Page>
  )
}

export default memo(AboutPage)
