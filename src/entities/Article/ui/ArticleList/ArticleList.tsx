import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { Article, ArticleView } from '../../model/types/article'
import cls from './ArticleList.module.scss'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 12 : 3)
  .fill(0)
  .map((item, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ))

export const ArticleList: FC<ArticleListProps> = memo((props) => {
  const {
    articles, className, isLoading, view = ArticleView.SMALL
  } = props
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    )
  }

  const renderArticle = (article: Article) => (
    <ArticleListItem
      className={cls.card}
      article={article}
      view={view}
      key={article.id}
    />
  )

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
    </div>
  )
})
