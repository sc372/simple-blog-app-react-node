import { ISignInFormUi, ISignUpFormUi } from '../../models'

export interface IAuthFormUiState {
  readonly signInFormUi: ISignInFormUi
  readonly signUpFormUi: ISignUpFormUi
}
