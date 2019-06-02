import { ISignInFormUi, ISignUpFormUi } from '../../models'

export interface IChangeSignInFormUiPayload {
  readonly signInFormUi: ISignInFormUi
}

export interface IChangeSignUpFormUiPayload {
  readonly signUpFormUi: ISignUpFormUi
}
