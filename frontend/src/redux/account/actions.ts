import { createAction, combineActions } from 'redux-actions'
import {
  SELECT_ACCOUNT,
  SELECT_ACCOUNT_WITH_TOKEN,
  SELECT_ACCOUNT_UI_SUCCESS,
  SELECT_ACCOUNT_DOMAIN_SUCCESS,
  ACCOUNT_ERROR,
  INITIAL_ACCOUNT_STATE,
} from './constants'
import {
  ISelectAccountPayload,
  ISelectAccountUiSuccessPayload,
  ISelectAccountDomainSuccessPayload,
  IAccountErrorPayload,
} from './payloads'
import { IAccountUi, IAccountDomain } from '../../models'
import { initialState } from './reducer'
import { IAccountState } from './state'

export const selectAccount = createAction<ISelectAccountPayload>(
  SELECT_ACCOUNT,
  () => ({ isLoading: true })
)

export const selectAccountWithJwt = createAction<ISelectAccountPayload>(
  SELECT_ACCOUNT_WITH_TOKEN,
  () => ({ isLoading: true })
)

export const selectAccountUiSuccess = createAction<
  ISelectAccountUiSuccessPayload,
  IAccountUi
>(SELECT_ACCOUNT_UI_SUCCESS, accountUi => ({ accountUi }))

export const selectAccountDomainSuccess = createAction<
  ISelectAccountDomainSuccessPayload,
  IAccountDomain
>(SELECT_ACCOUNT_DOMAIN_SUCCESS, accountDomain => ({ accountDomain }))

export const selectAccountError = createAction<IAccountErrorPayload, string>(
  ACCOUNT_ERROR,
  errorMessage => ({ errorMessage })
)

export const errorActions = combineActions(ACCOUNT_ERROR)

export const initialAccountState = createAction<IAccountState>(
  INITIAL_ACCOUNT_STATE,
  () => initialState
)
