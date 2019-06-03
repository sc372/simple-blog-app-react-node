import { IAccountUi, IAccountDomain, ISignInFormUi } from '../../models'

export interface IChangeSignInFormUiPayload {
  readonly signInFormUi: ISignInFormUi
}

export interface ISignInPayload {
  readonly accountIsLoading: boolean
}

export interface IChangeAccountUiPayload {
  readonly accountUi: IAccountUi
}

export interface IChangeAccountDomainPayload {
  readonly accountDomain: IAccountDomain
}

export interface IAccountSuccessPayload {
  readonly accountIsSuccess: boolean
}

export interface IAccountErrorPayload {
  readonly accountErrorMessage: string
}
