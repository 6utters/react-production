import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { toggleFeatures } from '@/shared/lib/features'
import cls from './NotificationList.module.scss'

interface NotificationListProps {
  className?: string
}

export const NotificationList: FC<NotificationListProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation()
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000
  })

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated
  })

  if (isLoading) {
    return (
      <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
      </VStack>
    )
  }

  return (
    <VStack gap='16' max className={classNames(cls.NotificationList, {}, [className])}>
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  )
})
