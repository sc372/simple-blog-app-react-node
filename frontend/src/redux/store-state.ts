import { IAccountState } from './account/state'
import { IAuthFormUiState } from './auth/state'

export interface IStoreState {
  readonly account: IAccountState
  readonly authFormUi: IAuthFormUiState
}
