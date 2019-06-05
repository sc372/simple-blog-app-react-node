import { ISignUpFormUi } from '../../models'

export interface IChangeSignUpFormUiPayload {
  readonly signUpFormUi: ISignUpFormUi
}

export interface ICreateUserPayload {
  readonly createUserIsLoading: boolean
}

export interface ICreateUserSuccessPayload {
  readonly createUserIsSuccess: boolean
}

export interface IAuthErrorPayload {
  readonly createUserErrorMessage: string
}
