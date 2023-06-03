import { CounterSchema } from 'entities/Counter'
import { UserSchema } from 'entities/User'
import { LoginSchema } from 'features/AuthByUsername'
import {
  AnyAction, EnhancedStore, Reducer, ReducersMapObject
} from '@reduxjs/toolkit'
import { CombinedState } from 'redux'
import { ProfileSchema } from 'entities/Profile'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from 'entities/Article'
import {
  ArticleDetailsCommentSchema,
  ArticleDetailsPageSchema,
  ArticleDetailsRecommendationsSchema
} from 'pages/ArticleDetailsPage'
import { AddCommentFormSchema } from 'features/AddCommentForm'
import { ArticlesPageSchema } from 'pages/ArticlesPage'
import { PageSchema } from 'widgets/Page'

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    page: PageSchema

    // async reducers:
    loginForm?: LoginSchema;
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    addCommentForm?: AddCommentFormSchema
    articlesPage?: ArticlesPageSchema
    articleDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}
