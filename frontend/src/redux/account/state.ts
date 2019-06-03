import { IAccountUi, IAccountDomain, ISignInFormUi } from '../../models'

export interface IAccountState {
  readonly signInFormUi: ISignInFormUi
  readonly accountUi: IAccountUi
  readonly accountDomain: IAccountDomain
  readonly accountIsSuccess: boolean
  readonly accountIsLoading: boolean
  readonly accountErrorMessage: string
}
