import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsCommentIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.comments?.isLoading
