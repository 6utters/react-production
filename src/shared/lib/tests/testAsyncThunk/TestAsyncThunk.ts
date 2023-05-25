import { StateSchema } from 'app/providers/StoreProvider'
import { AsyncThunkAction } from '@reduxjs/toolkit'

type EnhancedActionCreator<Returned, Arg, RejectedValue>
     = (arg: Arg) => AsyncThunkAction<Returned, Arg, {rejectValue: RejectedValue}>

export class TestAsyncThunk<Returned, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>

  getState: () => StateSchema

  actionCreator: EnhancedActionCreator<Returned, Arg, RejectedValue>

  constructor(actionCreator: EnhancedActionCreator<Returned, Arg, RejectedValue>) {
    this.actionCreator = actionCreator
    this.dispatch = jest.fn()
    this.getState = jest.fn()
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg)
    const result = await action(this.dispatch, this.getState, undefined)

    return result
  }
}
