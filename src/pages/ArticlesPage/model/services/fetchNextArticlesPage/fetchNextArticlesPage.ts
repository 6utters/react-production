import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { articlesPageActions } from '../../slice/articlesPageSlice'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'
import { getArticlesPageHasMore } from '../../selectors/getArticlesPageHasMore/getArticlesPageHasMore'
import {
  getArticlesPagePageNumber
} from '../../selectors/getArticlesPagePageNumber/getArticlesPagePageNumber'
import {
  getArticlesPageIsLoading
} from '../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/fetchNextArticlesPage',
  async (props, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPagePageNumber(getState())
    const isLoading = getArticlesPageIsLoading(getState())

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticleList({}))
    }
  }
)
