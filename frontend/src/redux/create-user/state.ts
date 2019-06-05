import { ISignUpFormUi } from '../../models'

export interface ICreateUserState {
  readonly signUpFormUi: ISignUpFormUi
  readonly createUserIsSuccess: boolean
  readonly createUserIsLoading: boolean
  readonly createUserErrorMessage: string
}
