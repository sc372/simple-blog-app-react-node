import { createAction } from 'redux-actions'
import { CHANGE_SIGN_IN_FORM_UI, CHANGE_SIGN_UP_FORM_UI } from './constants'
import {
  IChangeSignInFormUiPayload,
  IChangeSignUpFormUiPayload,
} from './payloads'
import { ISignInFormUi, ISignUpFormUi } from '../../models'

export const changeSignInFormUi = createAction<
  IChangeSignInFormUiPayload,
  ISignInFormUi
>(CHANGE_SIGN_IN_FORM_UI, signInFormUi => ({ signInFormUi }))

export const changeSignUpFormUi = createAction<
  IChangeSignUpFormUiPayload,
  ISignUpFormUi
>(CHANGE_SIGN_UP_FORM_UI, signUpFormUi => ({ signUpFormUi }))
