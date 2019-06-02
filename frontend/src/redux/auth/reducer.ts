import { handleActions } from 'redux-actions'
import { IAuthFormUiState } from './state'
import { CHANGE_SIGN_IN_FORM_UI, CHANGE_SIGN_UP_FORM_UI } from './constants'
import {
  IChangeSignInFormUiPayload,
  IChangeSignUpFormUiPayload,
} from './payloads'

export const initialState: IAuthFormUiState = {
  signInFormUi: {
    email: '',
    password: '',
    isAutoLogin: false,
  },
  signUpFormUi: {
    email: '',
    password: '',
    rePassword: '',
    nickname: '',
  },
}

export default handleActions<IAuthFormUiState>(
  {
    [CHANGE_SIGN_IN_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeSignInFormUiPayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
    [CHANGE_SIGN_UP_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeSignUpFormUiPayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
  initialState
)
