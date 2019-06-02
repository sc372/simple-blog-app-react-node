import { combineReducers, Reducer, AnyAction } from 'redux'
import { IStoreState } from './store-state'
import account from './account/reducer'
import authFormUi from './auth/reducer'

const rootReducer: Reducer<IStoreState, AnyAction> = combineReducers<
  IStoreState
>({
  account,
  authFormUi,
})

export default rootReducer
