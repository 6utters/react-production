import { FC, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList, ArticleView, ArticleViewSelect } from 'entities/Article'
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Page } from 'shared/ui/Page/Page'
import { getArticlesPageIsLoading } from '../../model/selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { getArticlesPageError } from '../../model/selectors/getArticlesPageError/getArticlesPageError'
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView'
import {
  getArticlesPagePageNumber
} from '../../model/selectors/getArticlesPagePageNumber/getArticlesPagePageNumber'
import cls from './ArticlesPage.module.scss'
import { getArticlesPageHasMore } from '../../model/selectors/getArticlesPageHasMore/getArticlesPageHasMore'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticleList({
      page: 1
    }))
  })

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticleViewSelect view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
