import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { Text } from '@/shared/ui/deprecated/Text'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'
import { AppLink } from '@/shared/ui/deprecated/AppLink'
import { VStack } from '@/shared/ui/deprecated/Stack'
import { Comment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { getRouteProfile } from '@/shared/const/router'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard: FC<CommentCardProps> = memo((props) => {
  const { comment, className, isLoading } = props

  if (isLoading) {
    return (
      <VStack
        gap='8'
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        data-testid='CommentCard.Loading'
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width='100%' height={50} />
      </VStack>
    )
  }

  if (!comment) {
    return null
  }

  return (
    <VStack gap='8' max className={classNames(cls.CommentCard, {}, [className])} data-testid='CommentCard.Content'>
      <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
        {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
        <Text className={cls.username} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  )
})
