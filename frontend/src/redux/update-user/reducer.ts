import { handleActions } from 'redux-actions'
import { IUpdateUserState } from './state'
import {
  CHANGE_UPDATE_USER_FORM_UI,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  INITIAL_UPDATE_USER_STATE,
} from './constants'
import {
  IChangeUpdateUserFormUiPayload,
  IUpdateUserPayload,
  IUpdateUserSuccessPayload,
  IUpdateUserErrorPayload,
} from './payloads'

export const initialState: IUpdateUserState = {
  updateUserFormUi: {
    id: '',
    email: '',
    nickname: '',
    filePath: '',
    fileName: '',
    jwtToken: '',
  },
  updateUserIsSuccess: false,
  updateUserIsLoading: false,
  updateUserErrorMessage: '',
}

export default handleActions<IUpdateUserState>(
  {
    [UPDATE_USER]: (
      state,
      action: ReduxActions.Action<IUpdateUserPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_UPDATE_USER_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeUpdateUserFormUiPayload>
    ) => ({ ...state, ...action.payload }),
    [UPDATE_USER_SUCCESS]: (
      state,
      action: ReduxActions.Action<IUpdateUserSuccessPayload>
    ) => ({ ...state, updateUserIsLoading: false, ...action.payload }),
    [UPDATE_USER_ERROR]: (
      state,
      action: ReduxActions.Action<IUpdateUserErrorPayload>
    ) => ({ ...state, updateUserIsLoading: false, ...action.payload }),
    [INITIAL_UPDATE_USER_STATE]: (
      state,
      action: ReduxActions.Action<IUpdateUserState>
    ) => action.payload,
  },
  initialState
)
