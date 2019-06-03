import { ISignUpFormUi } from '../../models'

export interface IChangeSignUpFormUiPayload {
  readonly signUpFormUi: ISignUpFormUi
}

export interface ICreateUserPayload {
  readonly authIsLoading: boolean
}

export interface ICreateUserSuccessPayload {
  readonly signUpIsSuccess: boolean
}

export interface IAuthErrorPayload {
  readonly authErrorMessage: string
}
