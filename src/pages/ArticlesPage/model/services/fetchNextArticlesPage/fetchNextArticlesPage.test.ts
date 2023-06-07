import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk'
import { fetchNextArticlesPage } from './fetchNextArticlesPage'
import { fetchArticleList } from '../fetchArticleList/fetchArticleList'

jest.mock('../fetchArticleList/fetchArticleList')

describe('fetchNextArticlesPage', () => {
  // test('successful', async () => {
  //   const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
  //     articlesPage: {
  //       page: 2,
  //       ids: [],
  //       entities: {},
  //       limit: 5,
  //       isLoading: false,
  //       hasMore: true
  //     }
  //   })
  //   await thunk.callThunk()
  //
  //   expect(thunk.dispatch).toBeCalledTimes(1)
  //   expect(fetchArticleList).toBeCalledWith({ page: 3 })
  // })
  test('not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false
      }
    })
    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()
  })
})
