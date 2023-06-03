import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/AddCommentForm'
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle'
import { Page } from 'widgets/Page/ui/Page'
import {
  getArticleDetailsCommentIsLoading
} from '../../model/selectors/getArticleDetailsCommentIsLoading/getArticleDetailsCommentIsLoading'
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  getArticleRecommendations
} from '../../model/slices/articleDetailsRecommendationSlice'
import {
  getArticleRecommendationsIsLoading
} from '../../model/selectors/getArticleRecommendationsIsLoading/getArticleRecommendationsIsLoading'
import {
  fetchArticleRecommendations
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()

  const { id } = useParams<{id: string}>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsLoading = useSelector(getArticleDetailsCommentIsLoading)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const recommendationsLoading = useSelector(getArticleRecommendationsIsLoading)

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value))
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
  })

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.comment_title}
          title={t('Рекомендуем')}
        />
        <ArticleList
          className={cls.recommendations}
          articles={recommendations}
          isLoading={recommendationsLoading}
          target="_blank"
        />
        <Text
          size={TextSize.L}
          className={cls.comment_title}
          title={t('Комментарии')}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          isLoading={commentsLoading}
          comments={comments}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
