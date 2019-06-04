import { handleActions } from 'redux-actions'
import { IBlogFormState } from './state'
import {
  CHANGE_BLOG_FORM_UI,
  CREATE_BLOG,
  BLOG_FORM_SUCCESS,
  BLOG_FORM_ERROR,
  INITIAL_BLOG_FORM_UI_STATE,
  UPDATE_BLOG,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
} from './constants'
import {
  IChangeBlogFormUiPayload,
  ICreateBlogPayload,
  IBlogFormSuccessPayload,
  IBlogFormErrorPayload,
  IUpdateBlogPayload,
  IDeleteBlogPayload,
  IDeleteBlogSuccessPayload,
  IDeleteBlogErrorPayload,
} from './payloads'

export const initialState: IBlogFormState = {
  blogFormUi: {
    blogId: '',
    userId: '',
    title: '',
    contents: '',
    fileName: '',
    filePath: '',
  },
  blogFormIsSuccess: false,
  blogFormIsLoading: false,
  blogFormErrorMessage: '',
  deleteBlogIsSuccess: false,
  deleteBlogIsLoading: false,
  deleteBlogErrorMessage: '',
}

export default handleActions<IBlogFormState>(
  {
    [CHANGE_BLOG_FORM_UI]: (
      state,
      action: ReduxActions.Action<IChangeBlogFormUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CREATE_BLOG]: (
      state,
      action: ReduxActions.Action<ICreateBlogPayload>
    ) => ({ ...state, ...action.payload }),
    [UPDATE_BLOG]: (
      state,
      action: ReduxActions.Action<IUpdateBlogPayload>
    ) => ({ ...state, ...action.payload }),
    [BLOG_FORM_SUCCESS]: (
      state,
      action: ReduxActions.Action<IBlogFormSuccessPayload>
    ) => ({ ...state, blogFormIsLoading: false, ...action.payload }),
    [BLOG_FORM_ERROR]: (
      state,
      action: ReduxActions.Action<IBlogFormErrorPayload>
    ) => ({ ...state, blogFormIsLoading: false, ...action.payload }),
    [DELETE_BLOG]: (
      state,
      action: ReduxActions.Action<IDeleteBlogPayload>
    ) => ({ ...state, ...action.payload }),
    [DELETE_BLOG_SUCCESS]: (
      state,
      action: ReduxActions.Action<IDeleteBlogSuccessPayload>
    ) => ({ ...state, deleteBlogFormIsLoading: false, ...action.payload }),
    [DELETE_BLOG_ERROR]: (
      state,
      action: ReduxActions.Action<IDeleteBlogErrorPayload>
    ) => ({ ...state, deleteBlogFormIsLoading: false, ...action.payload }),
    [INITIAL_BLOG_FORM_UI_STATE]: (
      state,
      action: ReduxActions.Action<IBlogFormState>
    ) => action.payload,
  },
  initialState
)
