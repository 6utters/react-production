import { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsIsLoading } from './getArticleDetailsIsLoading'

describe('getArticleDetailsIsLoading', () => {
  test('should return article loading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true
      }
    }
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true)
  })
  test('should return undefined if state is empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined)
  })
})
