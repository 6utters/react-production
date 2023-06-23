import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { getArticlesPageView } from '../../model/selectors/getArticlesPageView/getArticlesPageView'
import { getArticlesPageSort } from '../../model/selectors/getArticlesPageSort/getArticlesPageSort'
import { getArticlesPageOrder } from '../../model/selectors/getArticlesPageOrder/getArticlesPageOrder'
import { getArticlesPageSearch } from '../../model/selectors/getArticlesPageSearch/getArticlesPageSearch'
import { getArticlesPageType } from '../../model/selectors/getArticlesPageType/getArticlesPageType'
import { ArticleSortField, ArticleType, ArticleView } from '@/entities/Article'
import { articlesPageActions } from '../../model/slice/articlesPageSlice'
import { SortOrder } from '@/shared/types/sort'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

export function useArticleFilters() {
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

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch]
  )

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData]
  )

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [dispatch, fetchData]
  )

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search))
      dispatch(articlesPageActions.setPage(1))
      debouncedChangeData()
    },
    [debouncedChangeData, dispatch]
  )

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value))
      dispatch(articlesPageActions.setPage(1))
      fetchData()
    },
    [fetchData, dispatch]
  )

  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType
  }
}
