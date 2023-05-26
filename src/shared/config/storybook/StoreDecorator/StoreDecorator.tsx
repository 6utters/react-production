import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { profileReducer } from 'entities/Profile'
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer
}

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList
) => (StoryComponent: Story) => (
  <StoreProvider
    initialState={initialState}
    asyncReducers={{ ...asyncReducers, ...defaultReducers }}
  >
    <StoryComponent />
  </StoreProvider>
)
