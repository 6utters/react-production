import { createAsyncThunk } from '@reduxjs/toolkit'
import { Comment } from '@/entities/Comment'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkAPI) => {
  const { dispatch, extra, rejectWithValue, getState } = thunkAPI

  const userData = getAuthData(getState())
  const article = getArticleDetailsData(getState())

  if (!userData || !text || !article) {
    return rejectWithValue('no data')
  }

  try {
    const response = await extra.api.post<Comment>('/comments', {
      articleId: article.id,
      userId: userData.id,
      text
    })
    if (!response.data) {
      throw new Error()
    }

    dispatch(fetchCommentsByArticleId(article.id))

    return response.data
  } catch (e) {
    return rejectWithValue('error')
  }
})
