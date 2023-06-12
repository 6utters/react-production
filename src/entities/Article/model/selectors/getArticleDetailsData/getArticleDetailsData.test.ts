import { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from './getArticleDetailsData'

describe('getArticleDetailsData', () => {
  test('should return article data', () => {
    const data = {
      id: '1',
      title: 'title',
      subtitle: 'subtitle'
    }
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data
      }
    }
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
  })
  test('should return undefined if state is empty', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined)
  })
})
