import { FC, memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo'
import { Card } from '@/shared/ui/redesigned/Card'
import { getArticleDetailsData } from '@/entities/Article'
import cls from './AdditionalInfoContainer.module.scss'
import { getRouteArticleEdit } from '@/shared/const/router'

export const AdditionalInfoContainer: FC = memo(() => {
  const article = useSelector(getArticleDetailsData)
  const navigate = useNavigate()

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleEdit(article?.id))
    }
  }, [article?.id, navigate])

  if (!article) {
    return null
  }

  return (
    <Card padding='24' border='rounded' className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        views={article.views}
        createdAt={article.createdAt}
      />
    </Card>
  )
})