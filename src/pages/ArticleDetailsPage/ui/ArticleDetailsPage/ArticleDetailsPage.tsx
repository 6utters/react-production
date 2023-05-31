import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AddCommentForm } from 'features/AddCommentForm'
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle'
import {
  getArticleDetailsCommentIsLoading
} from '../../model/selectors/getArticleDetailsCommentIsLoading/getArticleDetailsCommentIsLoading'
import { articleDetailsCommentReducer, getArticleComments } from '../../model/slice/articleDetailsCommentSlice'
import {
  fetchCommentsByArticleId
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducerList = {
  articleDetailsComment: articleDetailsCommentReducer
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()
  const { id } = useParams<{id: string}>()
  const comments = useSelector(getArticleComments.selectAll)
  const commentsLoading = useSelector(getArticleDetailsCommentIsLoading)

  const onSendComment = useCallback((value: string) => {
    dispatch(addCommentForArticle(value))
  }, [dispatch])

  useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)))

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text className={cls.comment_title} title={t('Комментарии')} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          isLoading={commentsLoading}
          comments={comments}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticleDetailsPage)
