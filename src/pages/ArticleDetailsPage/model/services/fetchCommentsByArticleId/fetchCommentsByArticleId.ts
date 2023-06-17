import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI

  try {
    if (!articleId) {
      return rejectWithValue('error')
    }

    const response = await extra.api.get<Comment[]>('/comments/', {
      params: {
        articleId,
        _expand: 'user'
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
