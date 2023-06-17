import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlags } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings/saveJsonSettings'
import { JsonSettings } from '../types/jsonSettings'
import { initAuthData } from '../services/initAuthData/initAuthData'

const initialState: UserSchema = {
  _inited: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload.id))
    },
    logout: (state) => {
      state.authData = undefined
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJsonSettings.fulfilled, (state, action: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload
        }
      })
      .addCase(initAuthData.fulfilled, (state, action: PayloadAction<User>) => {
        state.authData = action.payload
        setFeatureFlags(action.payload.features)
        state._inited = true
      })
      .addCase(initAuthData.rejected, (state) => {
        state._inited = true
      })
  }
})

export const { actions: userActions, reducer: userReducer } = userSlice
