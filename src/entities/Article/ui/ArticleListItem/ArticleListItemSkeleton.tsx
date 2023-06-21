import { FC, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'
import { ArticleView } from '../../model/consts/articleConsts'
import { toggleFeatures } from '@/shared/lib/features'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo((props) => {
  const { className, view } = props

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.ArticleListItemRedesigned,
    off: () => cls.ArticleListItem
  })

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated
  })

  const Card = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => CardRedesigned,
    off: () => CardDeprecated
  })

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(mainClass, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Skeleton border='50%' height={30} width={30} />
            <Skeleton width={150} height={16} className={cls.username} />
            <Skeleton width={150} height={16} className={cls.date} />
          </div>
          <Skeleton width={250} height={24} className={cls.title} />
          <Skeleton height={200} className={cls.img} />
          <div className={cls.footer}>
            <Skeleton height={36} width={200} />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={classNames(mainClass, {}, [className, cls[view]])}>
      <Card>
        <div className={cls.image_wrapper}>
          <Skeleton width={200} height={200} className={cls.img} />
        </div>
        <div className={cls.info_wrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={cls.title} />
      </Card>
    </div>
  )
})
