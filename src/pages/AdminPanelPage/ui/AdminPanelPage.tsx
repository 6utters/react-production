import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage: FC<AdminPanelPageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  return (
    <Page
      data-testid='AdminPanelPage'
      className={classNames('', {}, [className])}
    >
      {t('Админ панель')}
    </Page>
  )
}

export default memo(AdminPanelPage)
