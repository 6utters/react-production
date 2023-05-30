import { StateSchema } from 'app/providers/StoreProvider'

export const getArticleDetailsCommentError = (state: StateSchema) => state.articleDetailsComment?.error
