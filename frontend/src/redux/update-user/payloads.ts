import { IUpdateUserFormUi } from '../../models'

export interface IUpdateUserPayload {
  readonly updateUserIsLoading: boolean
}

export interface IChangeUpdateUserFormUiPayload {
  readonly updateUserFormUi: IUpdateUserFormUi
}

export interface IUpdateUserSuccessPayload {
  readonly updateUserIsSuccess: boolean
}

export interface IUpdateUserErrorPayload {
  readonly updateUserErrorMessage: string
}
