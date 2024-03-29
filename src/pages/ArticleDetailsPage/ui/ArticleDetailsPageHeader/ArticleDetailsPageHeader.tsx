import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { getCanEditArticle } from '../../model/selectors/getCanEditArticle/getCanEditArticle'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation('article')
  const navigate = useNavigate()
  const article = useSelector(getArticleDetailsData)
  const canEdit = useSelector(getCanEditArticle)

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles())
  }, [navigate])

  const onEditArticle = useCallback(() => {
    if (article?.id) {
      navigate(getRouteArticleEdit(article?.id))
    }
  }, [article?.id, navigate])

  return (
    <HStack max justify='between' className={classNames('', {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t('Назад к списку')}
      </Button>
      {canEdit && (
        <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  )
})
