import { IUpdateUserFormUi } from '../../models'

export interface IUpdateUserState {
  readonly updateUserFormUi: IUpdateUserFormUi
  readonly updateUserIsSuccess: boolean
  readonly updateUserIsLoading: boolean
  readonly updateUserErrorMessage: string
}
