import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticlesPagePageNumber = (state: StateSchema) =>
  state.articlesPage?.page || 1
