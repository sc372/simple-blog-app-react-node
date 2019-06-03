import { createAction } from 'redux-actions'
import {
  UPDATE_USER,
  CHANGE_UPDATE_USER_FORM_UI,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  INITIAL_UPDATE_USER_STATE,
} from './constants'
import {
  IUpdateUserPayload,
  IChangeUpdateUserFormUiPayload,
  IUpdateUserSuccessPayload,
  IUpdateUserErrorPayload,
} from './payloads'
import { IUpdateUserFormUi } from '../../models'
import { initialState } from './reducer'

export const updateUser = createAction<IUpdateUserPayload>(UPDATE_USER, () => ({
  updateUserIsLoading: true,
}))

export const changeUpdateUserFormUi = createAction<
  IChangeUpdateUserFormUiPayload,
  IUpdateUserFormUi
>(CHANGE_UPDATE_USER_FORM_UI, updateUserFormUi => ({ updateUserFormUi }))

export const updateUserSuccess = createAction<IUpdateUserSuccessPayload>(
  UPDATE_USER_SUCCESS,
  () => ({ updateUserIsSuccess: true })
)

export const updateUserError = createAction<IUpdateUserErrorPayload, string>(
  UPDATE_USER_ERROR,
  updateUserErrorMessage => ({
    updateUserErrorMessage,
    updateUserIsSuccess: false,
  })
)

export const initialUpdateUserState = createAction(
  INITIAL_UPDATE_USER_STATE,
  () => initialState
)
