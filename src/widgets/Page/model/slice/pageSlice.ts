import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageSchema } from '../types/page'

const initialState: PageSchema = {
  scroll: {}
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setScrollPosition: (
      state,
      action: PayloadAction<{ path: string; position: number }>
    ) => {
      state.scroll[action.payload.path] = action.payload.position
    }
  }
})

export const { actions: pageActions, reducer: pageReducer } = pageSlice
