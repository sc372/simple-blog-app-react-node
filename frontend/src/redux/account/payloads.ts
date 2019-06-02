import { IAccountUi, IAccountDomain } from '../../models'

export interface ISelectAccountPayload {
  readonly isLoading: boolean
}

export interface ISelectAccountUiSuccessPayload {
  readonly accountUi: IAccountUi
}

export interface ISelectAccountDomainSuccessPayload {
  readonly accountDomain: IAccountDomain
}

export interface IAccountErrorPayload {
  readonly errorMessage: string
}
