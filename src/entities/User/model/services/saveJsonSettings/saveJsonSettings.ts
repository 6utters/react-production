import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { JsonSettings } from '../../types/jsonSettings'
import { getAuthData } from '../../selectors/getAuthData/getAuthData'
import { getUserJsonSettings } from '../../selectors/getUserJsonSettings/getUserJsonSettings'
import { setJsonSettings } from '../../../api/userApi'

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
  'user/saveJsonSettings',
  async (newJsonSettings, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const userData = getAuthData(getState())
    const currentSettings = getUserJsonSettings(getState())

    if (!userData) {
      return rejectWithValue('')
    }

    try {
      const response = await dispatch(
        setJsonSettings({
          userId: userData.id,
          jsonSettings: {
            ...currentSettings,
            ...newJsonSettings
          }
        })
      ).unwrap()

      if (!response.jsonSettings) {
        return rejectWithValue('')
      }

      return response.jsonSettings
    } catch (e) {
      console.log(e)
      return rejectWithValue('error')
    }
  }
)
