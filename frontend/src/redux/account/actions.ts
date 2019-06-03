import { createAction } from 'redux-actions'
import {
  SIGN_IN,
  SIGN_IN_WITH_TOKEN,
  CHANGE_SIGN_IN_FORM_UI,
  CHANGE_ACCOUNT_UI,
  CHANGE_ACCOUNT_DOMAIN,
  ACCOUNT_ERROR,
  ACCOUNT_SUCCESS,
  INITIAL_ACCOUNT_STATE,
} from './constants'
import {
  ISignInPayload,
  IChangeSignInFormUiPayload,
  IChangeAccountUiPayload,
  IChangeAccountDomainPayload,
  IAccountSuccessPayload,
  IAccountErrorPayload,
} from './payloads'
import { IAccountUi, IAccountDomain, ISignInFormUi } from '../../models'
import { initialState } from './reducer'

export const changeSignInFormUi = createAction<
  IChangeSignInFormUiPayload,
  ISignInFormUi
>(CHANGE_SIGN_IN_FORM_UI, signInFormUi => ({ signInFormUi }))

export const signIn = createAction<ISignInPayload>(SIGN_IN, () => ({
  accountIsLoading: true,
}))

export const signInWithJwt = createAction<ISignInPayload>(
  SIGN_IN_WITH_TOKEN,
  () => ({ accountIsLoading: true })
)

export const changeAccountUiSuccess = createAction<
  IChangeAccountUiPayload,
  IAccountUi
>(CHANGE_ACCOUNT_UI, accountUi => ({ accountUi }))

export const changeAccountDomainSuccess = createAction<
  IChangeAccountDomainPayload,
  IAccountDomain
>(CHANGE_ACCOUNT_DOMAIN, accountDomain => ({ accountDomain }))

export const selectAccountSuccess = createAction<IAccountSuccessPayload>(
  ACCOUNT_SUCCESS,
  () => ({ accountIsSuccess: true })
)

export const selectAccountError = createAction<IAccountErrorPayload, string>(
  ACCOUNT_ERROR,
  accountErrorMessage => ({ accountErrorMessage })
)

export const initialAccountState = createAction(
  INITIAL_ACCOUNT_STATE,
  () => initialState
)
