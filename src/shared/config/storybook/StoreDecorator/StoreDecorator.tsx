import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer
}

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
) => (StoryComponent: Story) => (
  <StoreProvider
    initialState={initialState}
    asyncReducers={{ ...asyncReducers, ...defaultReducers }}
  >
    <StoryComponent />
  </StoreProvider>
)
