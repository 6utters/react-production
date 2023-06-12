import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/ui/Page'

interface ForbiddenPageProps {
    className?: string
}

export const ForbiddenPage: FC<ForbiddenPageProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation()
  return (
    <Page>
      {t('Нет доступа к данной странице')}
    </Page>
  )
})
