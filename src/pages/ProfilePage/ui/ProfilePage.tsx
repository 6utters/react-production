import { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/ui/Page'
import { VStack } from 'shared/ui/Stack/VStack/VStack'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'

interface ProfilePageProps {
    className?: string
}

const ProfilePage: FC<ProfilePageProps> = (props) => {
  const { className } = props
  const { t } = useTranslation('profile')
  const { id } = useParams<{id: string}>()

  if (!id) {
    return <Text text={t('Профиль не найден')} />
  }

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16" max>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  )
}

export default memo(ProfilePage)
