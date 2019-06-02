import { IAccountUi, IAccountDomain } from '../../models'

export interface IAccountState {
  readonly accountUi: IAccountUi
  readonly accountDomain: IAccountDomain
  readonly isLoading: boolean
  readonly errorMessage: string
}
