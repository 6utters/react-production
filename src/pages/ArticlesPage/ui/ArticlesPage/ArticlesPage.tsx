import { FC, memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList'
import { articlesPageReducer } from '../../model/slice/articlesPageSlice'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticlePageGreeting } from '@/features/ArticlePageGreeting'
import { ToggleFeatures } from '@/shared/lib/features'
import { StickyContentLayout } from '@/shared/layouts'
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  const content = (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={
        <StickyContentLayout
          left={<ViewSelectorContainer />}
          center={
            <Page
              data-testid='ArticlesPage'
              onScrollEnd={onLoadNextPart}
              className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
            >
              <ArticlesInfiniteList className={cls.list} />
              <ArticlePageGreeting />
            </Page>
          }
          right={<FiltersContainer />}
        />
      }
      off={
        <Page
          data-testid='ArticlesPage'
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPage, {}, [className])}
        >
          <ArticlesPageFilters />
          <ArticlesInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  )

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
