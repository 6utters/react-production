import { rtkApi } from '@/shared/api/rtkApi'
import { Rating } from '@/entities/Rating'

interface GetArticleRatingArg {
  userId: string
  articleId: string
}

interface RateArticleArg {
  userId: string
  articleId: string
  rate: number
  feedback?: string
}

const ArticleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ articleId, userId }) => ({
        url: '/article-ratings',
        params: {
          userId,
          articleId
        }
      })
    }),
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        url: '/article-ratings',
        method: 'POST',
        body: arg
      })
    })
  })
})

export const useGetArticleRating = ArticleRatingApi.useGetArticleRatingQuery
export const useRateArticle = ArticleRatingApi.useRateArticleMutation
