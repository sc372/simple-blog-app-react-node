import { combineReducers, Reducer, AnyAction } from 'redux'
import { IStoreState } from './store-state'
import account from './account/reducer'
import updateUser from './update-user/reducer'
import createUser from './create-user/reducer'
import blogForm from './blog-form/reducer'
import myBlogs from './my-blogs/reducer'
import blogs from './blogs/reducer'
import blog from './blog/reducer'

const rootReducer: Reducer<IStoreState, AnyAction> = combineReducers<
  IStoreState
>({
  account,
  createUser,
  updateUser,
  blogForm,
  myBlogs,
  blogs,
  blog,
})

export default rootReducer
