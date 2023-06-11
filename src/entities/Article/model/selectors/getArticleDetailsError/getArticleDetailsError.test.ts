import { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleDetailsError } from './getArticleDetailsError'

describe('getArticleDetailsError', () => {
  test('should return article error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error'
      }
    }
    expect(getArticleDetailsError(state as StateSchema)).toEqual('error')
  })
  test('should return undefined if state is empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined)
  })
})
