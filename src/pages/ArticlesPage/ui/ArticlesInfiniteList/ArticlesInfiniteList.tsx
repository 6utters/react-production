import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { ArticleList } from '@/entities/Article'
import { Text } from '@/shared/ui/deprecated/Text'
import { getArticles } from '../../model/slice/articlesPageSlice'
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError'
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'

interface ArticlesInfiniteListProps {
  className?: string
}

export const ArticlesInfiniteList: FC<ArticlesInfiniteListProps> = memo((props) => {
  const { className } = props
  const { t } = useTranslation('article')

  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const [searchParams] = useSearchParams()
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  if (error) {
    return <Text text={t('Ошибка при загрузке')} />
  }

  return <ArticleList className={className} isLoading={isLoading} view={view} articles={articles} />
})
