import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { User } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import cls from './ArticleAdditionalInfo.module.scss'

interface ArticleAdditionalInfoProps {
  className?: string
  author: User
  createdAt: string
  views: number
  onEdit: () => void
}

export const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = memo((props) => {
  const { className, createdAt, views, author, onEdit } = props
  const { t } = useTranslation()
  return (
    <VStack gap='32' className={classNames(cls.ArticleAdditionalInfo, {}, [className])}>
      <HStack gap='8'>
        <Avatar src={author.avatar} size={32} />
        <Text text={author.username} bold />
        <Text text={createdAt} />
      </HStack>
      <Button onClick={onEdit}>{t('Редактировать')}</Button>
      <Text text={t('{{count}} Просмотров', { count: views })} />
    </VStack>
  )
})
