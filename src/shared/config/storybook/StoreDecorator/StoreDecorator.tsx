import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/features/AddCommentForm/testing'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing'
import { profileReducer } from '@/features/EditableProfileCard/testing'

const defaultReducers: ReducerList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleDetailsPage: articleDetailsPageReducer
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
