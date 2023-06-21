import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/redesigned/Text'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher'

interface SettingsPageProps {
  className?: string
}

const SettingsPage = (props: SettingsPageProps) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap='16'>
        <UiDesignSwitcher />
      </VStack>
      <Text text={t('Страница с настройками')} />
    </Page>
  )
}

export default memo(SettingsPage)
