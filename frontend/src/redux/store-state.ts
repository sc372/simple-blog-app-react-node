import { IAccountState } from './account/state'
import { ICreateUserState } from './create-user/state'
import { IUpdateUserState } from './update-user/state'
import { IBlogFormState } from './blog-form/state'
import { IMyBlogsState } from './my-blogs/state'
import { IBlogsState } from './blogs/state'
import { IBlogState } from './blog/state'

export interface IStoreState {
  readonly account: IAccountState
  readonly createUser: ICreateUserState
  readonly updateUser: IUpdateUserState
  readonly blogForm: IBlogFormState
  readonly myBlogs: IMyBlogsState
  readonly blogs: IBlogsState
  readonly blog: IBlogState
}
