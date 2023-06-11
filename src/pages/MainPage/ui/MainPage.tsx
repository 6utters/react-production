import { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/ui/Page'

const MainPage: FC = () => {
  const { t } = useTranslation('main')

  return (
    <Page>
      {t('Главная страница')}
    </Page>
  )
}

export default memo(MainPage)
