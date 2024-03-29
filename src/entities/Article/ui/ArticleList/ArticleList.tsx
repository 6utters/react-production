import { FC, HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { ArticleView } from '../../model/consts/articleConsts'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { Article } from '../../model/types/article'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 12 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const { articles, className, isLoading, view = ArticleView.SMALL, target } = props
  const { t } = useTranslation('article')

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    )
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <HStack
          wrap='wrap'
          gap='16'
          data-testid='ArticleList'
          className={classNames(cls.ArticleListRedesigned, {}, [])}
        >
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} className={cls.card} />
          ))}
          {isLoading && getSkeletons(view)}
        </HStack>
      }
      off={
        <div data-testid='ArticleList' className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          {articles.map((item) => (
            <ArticleListItem article={item} view={view} target={target} key={item.id} className={cls.card} />
          ))}
          {isLoading && getSkeletons(view)}
        </div>
      }
    />
  )
})
