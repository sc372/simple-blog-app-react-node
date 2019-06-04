import { ISignUpFormUi } from '../../models'

export interface ICreateUserState {
  readonly signUpFormUi: ISignUpFormUi
  readonly signUpIsSuccess: boolean
  readonly createUserIsLoading: boolean
  readonly createUserErrorMessage: string
}
