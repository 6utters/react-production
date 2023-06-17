import { combineReducers } from '@reduxjs/toolkit'
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationSlice'
import { articleDetailsCommentReducer } from './articleDetailsCommentSlice'
import { ArticleDetailsPageSchema } from '../types'

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsRecommendationsReducer,
    comments: articleDetailsCommentReducer
  })
