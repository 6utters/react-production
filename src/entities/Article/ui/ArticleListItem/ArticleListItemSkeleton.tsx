import { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {
  ArticleBlockType, ArticleTextBlock, ArticleView
} from '../../model/types/article'
import cls from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleView
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = memo((props) => {
  const { className, view } = props

  if (view === ArticleView.BIG) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Skeleton border="50%" height={30} width={30} />
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
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
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
