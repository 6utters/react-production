import {
  FC, memo, useCallback, useMemo
} from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  ArticleSortField, ArticleSortSelector, ArticleTypeTabs, ArticleType, ArticleView, ArticleViewSelect
} from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { SortOrder } from '@/shared/types'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView'
import { articlesPageActions } from '../../model/slice/articlesPageSlice'
import { getArticlesPageSort } from '../../model/selectors/getArticlesPageSort/getArticlesPageSort'
import { getArticlesPageOrder } from '../../model/selectors/getArticlesPageOrder/getArticlesPageOrder'
import { getArticlesPageSearch } from '../../model/selectors/getArticlesPageSearch/getArticlesPageSearch'
import { getArticlesPageType } from '../../model/selectors/getArticlesPageType/getArticlesPageType'
import cls from './ArticlesPageFilters.module.scss'

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(({ className }) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView)
  const sort = useSelector(getArticlesPageSort)
  const order = useSelector(getArticlesPageOrder)
  const search = useSelector(getArticlesPageSearch)
  const type = useSelector(getArticlesPageType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticleList({ replace: true }))
  }, [dispatch])

  const debouncedChangeData = useDebounce(fetchData, 500)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onChangeSort = useCallback((newSort: ArticleSortField) => {
    dispatch(articlesPageActions.setSort(newSort))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(articlesPageActions.setOrder(newOrder))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])

  const onChangeSearch = useCallback((search: string) => {
    dispatch(articlesPageActions.setSearch(search))
    dispatch(articlesPageActions.setPage(1))
    debouncedChangeData()
  }, [debouncedChangeData, dispatch])

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesPageActions.setType(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [fetchData, dispatch])

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sort_wrapper}>
        <ArticleSortSelector
          sort={sort}
          order={order}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelect view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onChangeType={onChangeType}
      />
    </div>
  )
})
