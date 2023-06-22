import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User } from '../../types/user'
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { getUserDataById } from '../../../api/userApi'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const userId = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) as string)

    if (!userId) {
      return rejectWithValue('')
    }

    try {
      const response = await dispatch(getUserDataById(userId)).unwrap()

      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, response.features?.isAppRedesigned ? 'new' : 'old')

      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  }
)
