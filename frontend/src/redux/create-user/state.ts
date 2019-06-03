import { ISignUpFormUi } from '../../models'

export interface IAuthState {
  readonly signUpFormUi: ISignUpFormUi
  readonly signUpIsSuccess: boolean
  readonly authIsLoading: boolean
  readonly authErrorMessage: string
}
