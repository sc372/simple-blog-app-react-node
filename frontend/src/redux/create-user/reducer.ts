import { handleActions } from 'redux-actions'
import { IAuthState } from './state'
import {
  CHANGE_SIGN_UP_FORM_UI,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  INITIAL_AUTH_STATE,
} from './constants'
import {
  IChangeSignUpFormUiPayload,
  ICreateUserPayload,
  ICreateUserSuccessPayload,
  IAuthErrorPayload,
} from './payloads'

export const initialState: IAuthState = {
  signUpFormUi: {
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  },
  signUpIsSuccess: false,
  authIsLoading: false,
  authErrorMessage: '',
}

export default handleActions<IAuthState>(
  {
    [CHANGE_SIGN_UP_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeSignUpFormUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CREATE_USER]: (
      state,
      action: ReduxActions.Action<ICreateUserPayload>
    ) => ({ ...state, ...action.payload }),
    [CREATE_USER_SUCCESS]: (
      state,
      action: ReduxActions.Action<ICreateUserSuccessPayload>
    ) => ({ ...state, authIsLoading: false, ...action.payload }),
    [CREATE_USER_ERROR]: (
      state,
      action: ReduxActions.Action<IAuthErrorPayload>
    ) => ({ ...state, authIsLoading: false, ...action.payload }),
    [INITIAL_AUTH_STATE]: (state, action: ReduxActions.Action<IAuthState>) =>
      action.payload,
  },
  initialState
)
