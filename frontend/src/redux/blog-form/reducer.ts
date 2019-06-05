import { handleActions } from 'redux-actions'
import { IBlogFormState } from './state'
import {
  CHANGE_BLOG_FORM_UI,
  CREATE_BLOG,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_ERROR,
  INITIAL_BLOG_FORM_UI_STATE,
  UPDATE_BLOG,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
} from './constants'
import {
  IChangeBlogFormUiPayload,
  ICreateBlogPayload,
  ICreateBlogSuccessPayload,
  ICreateBlogErrorPayload,
  IUpdateBlogPayload,
  IDeleteBlogPayload,
  IDeleteBlogSuccessPayload,
  IDeleteBlogErrorPayload,
  IUpdateBlogSuccessPayload,
  IUpdateBlogErrorPayload,
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
  createBlogIsSuccess: false,
  createBlogIsLoading: false,
  createBlogErrorMessage: '',
  deleteBlogIsSuccess: false,
  deleteBlogIsLoading: false,
  deleteBlogErrorMessage: '',
  updateBlogIsSuccess: false,
  updateBlogIsLoading: false,
  updateBlogErrorMessage: '',
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
    [CREATE_BLOG_SUCCESS]: (
      state,
      action: ReduxActions.Action<ICreateBlogSuccessPayload>
    ) => ({ ...state, createBlogIsLoading: false, ...action.payload }),
    [CREATE_BLOG_ERROR]: (
      state,
      action: ReduxActions.Action<ICreateBlogErrorPayload>
    ) => ({ ...state, createBlogIsLoading: false, ...action.payload }),
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
    [UPDATE_BLOG]: (
      state,
      action: ReduxActions.Action<IUpdateBlogPayload>
    ) => ({ ...state, ...action.payload }),
    [UPDATE_BLOG_SUCCESS]: (
      state,
      action: ReduxActions.Action<IUpdateBlogSuccessPayload>
    ) => ({ ...state, updateBlogFormIsLoading: false, ...action.payload }),
    [UPDATE_BLOG_ERROR]: (
      state,
      action: ReduxActions.Action<IUpdateBlogErrorPayload>
    ) => ({ ...state, updateBlogFormIsLoading: false, ...action.payload }),
    [INITIAL_BLOG_FORM_UI_STATE]: (
      state,
      action: ReduxActions.Action<IBlogFormState>
    ) => action.payload,
  },
  initialState
)
