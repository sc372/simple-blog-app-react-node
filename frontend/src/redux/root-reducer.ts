import { combineReducers, Reducer, AnyAction } from 'redux'
import { IStoreState } from './store-state'
import account from './account/reducer'
import auth from './create-user/reducer'
import updateUser from './update-user/reducer'

const rootReducer: Reducer<IStoreState, AnyAction> = combineReducers<
  IStoreState
>({
  account,
  auth,
  updateUser,
})

export default rootReducer
