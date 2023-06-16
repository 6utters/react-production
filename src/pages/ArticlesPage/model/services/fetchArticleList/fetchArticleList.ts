import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article, ArticleType } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'
import { getArticlesPageSort } from '../../selectors/getArticlesPageSort/getArticlesPageSort'
import { getArticlesPageOrder } from '../../selectors/getArticlesPageOrder/getArticlesPageOrder'
import { getArticlesPageSearch } from '../../selectors/getArticlesPageSearch/getArticlesPageSearch'
import { getArticlesPageLimit } from '../../selectors/getArticlesPageLimit/getArticlesPageLimit'
import { getArticlesPagePageNumber } from '../../selectors/getArticlesPagePageNumber/getArticlesPagePageNumber'
import { getArticlesPageType } from '../../selectors/getArticlesPageType/getArticlesPageType'

interface FetchArticleListProps {
  replace?: boolean
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>
>('articlesPage/fetchArticleList', async (props, thunkAPI) => {
  const { extra, rejectWithValue, getState } = thunkAPI
  const limit = getArticlesPageLimit(getState())
  const sort = getArticlesPageSort(getState())
  const order = getArticlesPageOrder(getState())
  const search = getArticlesPageSearch(getState())
  const page = getArticlesPagePageNumber(getState())
  const type = getArticlesPageType(getState())

  try {
    addQueryParams({
      sort,
      order,
      search,
      type
    })
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type
      }
    })

    if (!response.data) {
      throw new Error()
    }

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
