import { rtkApi } from 'shared/api/rtkApi'

const RecommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit
        }
      })
    })
  })
})

export const useArticleRecommendationsList = RecommendationsApi.useGetArticleRecommendationsListQuery
