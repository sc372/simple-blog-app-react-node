import { handleActions } from 'redux-actions'
import { IAccountState } from './state'
import {
  SELECT_ACCOUNT,
  SELECT_ACCOUNT_WITH_TOKEN,
  SELECT_ACCOUNT_UI_SUCCESS,
  SELECT_ACCOUNT_DOMAIN_SUCCESS,
  ACCOUNT_ERROR,
} from './constants'
import {
  ISelectAccountPayload,
  ISelectAccountUiSuccessPayload,
  ISelectAccountDomainSuccessPayload,
  IAccountErrorPayload,
} from './payloads'

export const initialState: IAccountState = {
  accountUi: {
    nickname: '',
    isLogin: false,
    filePath: '',
  },
  accountDomain: {
    id: '',
    email: '',
    nickname: '',
    createdAt: new Date(),
    jwtToken: '',
  },
  isLoading: false,
  errorMessage: '',
}

export default handleActions<IAccountState>(
  {
    [SELECT_ACCOUNT]: (
      state,
      action: ReduxActions.Action<ISelectAccountPayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
    [SELECT_ACCOUNT_WITH_TOKEN]: (
      state,
      action: ReduxActions.Action<ISelectAccountPayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
    [SELECT_ACCOUNT_UI_SUCCESS]: (
      state,
      action: ReduxActions.Action<ISelectAccountUiSuccessPayload>
    ) => ({ ...state, isLoading: false, ...action.payload }),
    [SELECT_ACCOUNT_DOMAIN_SUCCESS]: (
      state,
      action: ReduxActions.Action<ISelectAccountDomainSuccessPayload>
    ) => ({ ...state, isLoading: false, ...action.payload }),
    [ACCOUNT_ERROR]: (
      state,
      action: ReduxActions.Action<IAccountErrorPayload>
    ) => ({ ...state, isLoading: false, ...action.payload }),
  },
  initialState
)
