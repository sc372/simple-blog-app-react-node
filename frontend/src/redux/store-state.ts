import { IAccountState } from './account/state'
import { IAuthState } from './create-user/state'
import { IUpdateUserState } from './update-user/state'

export interface IStoreState {
  readonly account: IAccountState
  readonly auth: IAuthState
  readonly updateUser: IUpdateUserState
}
