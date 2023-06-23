import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { getAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/deprecated/Skeleton'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating: FC<ArticleRatingProps> = (props) => {
  const { className, articleId } = props
  const { t } = useTranslation()
  const userData = useSelector(getAuthData)
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })
  const [rateArticleMutation] = useRateArticle()

  const handleRateArticle = useCallback(
    (startCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: startCount,
          feedback
        })
      } catch (e) {
        console.log(e)
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  )

  const onAccept = useCallback(
    (startCount: number, feedback?: string) => {
      handleRateArticle(startCount, feedback)
    },
    [handleRateArticle]
  )

  const onCancel = useCallback(
    (startCount: number) => {
      handleRateArticle(startCount)
    },
    [handleRateArticle]
  )

  if (isLoading) {
    return <Skeleton width='100%' height={120} />
  }

  const rating = data?.[0]

  return (
    <RatingCard
      onCancel={onCancel}
      onAccept={onAccept}
      rate={rating?.rate}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв о статье, это поможет улучшить качество')}
      hasFeedback
    />
  )
}

// @ts-ignore
export default memo(ArticleRating)
