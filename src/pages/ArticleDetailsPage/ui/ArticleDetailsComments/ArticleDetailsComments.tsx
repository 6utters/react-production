import { FC, memo, useCallback, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { AddCommentForm } from '@/features/AddCommentForm'
import { CommentList } from '@/entities/Comment'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice'
import { getArticleDetailsCommentIsLoading } from '../../model/selectors/getArticleDetailsCommentIsLoading/getArticleDetailsCommentIsLoading'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { ToggleFeatures } from '@/shared/lib/features'

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo((props) => {
  const { className, id } = props
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()

  const comments = useSelector(getArticleComments.selectAll)
  const commentsLoading = useSelector(getArticleDetailsCommentIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const onSendComment = useCallback(
    (value: string) => {
      dispatch(addCommentForArticle(value))
    },
    [dispatch]
  )

  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      <ToggleFeatures
        feature='isAppRedesigned'
        on={<Text size='l' title={t('Комментарии')} />}
        off={<TextDeprecated size={TextSize.L} title={t('Комментарии')} />}
      />
      <Suspense fallback={t('Загрузка')}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsLoading} comments={comments} />
    </VStack>
  )
})
