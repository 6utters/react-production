import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice'
import { fetchArticleList } from 'pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList'
import { getArticlesPageInited } from 'pages/ArticlesPage/model/selectors/getArticlesPageInited/getArticlesPageInited'

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlesPage/initArticlesPage',
  async (props, thunkAPI) => {
    const { dispatch, getState } = thunkAPI

    const inited = getArticlesPageInited(getState())

    if (!inited) {
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticleList({
        page: 1
      }))
    }
  }
)
