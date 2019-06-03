import { handleActions } from 'redux-actions'
import { IAccountState } from './state'
import {
  SIGN_IN,
  SIGN_IN_WITH_TOKEN,
  CHANGE_ACCOUNT_UI,
  CHANGE_ACCOUNT_DOMAIN,
  ACCOUNT_SUCCESS,
  ACCOUNT_ERROR,
  INITIAL_ACCOUNT_STATE,
  CHANGE_SIGN_IN_FORM_UI,
} from './constants'
import {
  ISignInPayload,
  IChangeAccountUiPayload,
  IChangeAccountDomainPayload,
  IAccountErrorPayload,
  IAccountSuccessPayload,
  IChangeSignInFormUiPayload,
} from './payloads'

export const initialState: IAccountState = {
  signInFormUi: {
    email: '',
    password: '',
    isAutoLogin: false,
  },
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
    filePath: '',
    fileName: '',
    jwtToken: '',
  },
  accountIsSuccess: false,
  accountIsLoading: false,
  accountErrorMessage: '',
}

export default handleActions<IAccountState>(
  {
    [CHANGE_SIGN_IN_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeSignInFormUiPayload>
    ) => ({ ...state, ...action.payload }),
    [SIGN_IN]: (state, action: ReduxActions.Action<ISignInPayload>) => ({
      ...state,
      ...action.payload,
    }),
    [SIGN_IN_WITH_TOKEN]: (
      state,
      action: ReduxActions.Action<ISignInPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_ACCOUNT_UI]: (
      state,
      action: ReduxActions.Action<IChangeAccountUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_ACCOUNT_DOMAIN]: (
      state,
      action: ReduxActions.Action<IChangeAccountDomainPayload>
    ) => ({ ...state, accountIsLoading: false, ...action.payload }),
    [ACCOUNT_SUCCESS]: (
      state,
      action: ReduxActions.Action<IAccountSuccessPayload>
    ) => ({ ...state, accountIsLoading: false, ...action.payload }),
    [ACCOUNT_ERROR]: (
      state,
      action: ReduxActions.Action<IAccountErrorPayload>
    ) => ({ ...state, accountIsLoading: false, ...action.payload }),
    [INITIAL_ACCOUNT_STATE]: (
      state,
      action: ReduxActions.Action<IAccountState>
    ) => action.payload,
  },
  initialState
)
