import { createAction } from 'redux-actions'
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
import { ISignUpFormUi } from '../../models'
import { initialState } from './reducer'

export const changeSignUpFormUi = createAction<
  IChangeSignUpFormUiPayload,
  ISignUpFormUi
>(CHANGE_SIGN_UP_FORM_UI, signUpFormUi => ({ signUpFormUi }))

export const createUser = createAction<ICreateUserPayload>(CREATE_USER, () => ({
  createUserIsLoading: true,
}))

export const createUserSuccess = createAction<ICreateUserSuccessPayload>(
  CREATE_USER_SUCCESS,
  () => ({ signUpIsSuccess: true })
)

export const createUserError = createAction<IAuthErrorPayload, string>(
  CREATE_USER_ERROR,
  createUserErrorMessage => ({ createUserErrorMessage, signUpIsSuccess: false })
)

export const initialAuthState = createAction(
  INITIAL_AUTH_STATE,
  () => initialState
)
