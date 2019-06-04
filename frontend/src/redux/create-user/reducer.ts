import { handleActions } from 'redux-actions'
import { ICreateUserState } from './state'
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

export const initialState: ICreateUserState = {
  signUpFormUi: {
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  },
  signUpIsSuccess: false,
  createUserIsLoading: false,
  createUserErrorMessage: '',
}

export default handleActions<ICreateUserState>(
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
    ) => ({ ...state, createUserIsLoading: false, ...action.payload }),
    [CREATE_USER_ERROR]: (
      state,
      action: ReduxActions.Action<IAuthErrorPayload>
    ) => ({ ...state, createUserIsLoading: false, ...action.payload }),
    [INITIAL_AUTH_STATE]: (
      state,
      action: ReduxActions.Action<ICreateUserState>
    ) => action.payload,
  },
  initialState
)
