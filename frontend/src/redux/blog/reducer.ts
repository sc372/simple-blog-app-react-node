import { handleActions } from 'redux-actions'
import { IBlogState } from './state'
import {
  SELECT_BLOG,
  CHANGE_BLOG_UI,
  CHANGE_BLOG_DOMAIN,
  BLOG_SUCCESS,
  BLOG_ERROR,
  INITIAL_BLOG_STATE,
  CREATE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_ERROR,
  CREATE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_SUCCESS,
  UPDATE_BLOG_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_SUCCESS,
  UPDATE_BLOG_COMMENT,
  DELETE_BLOG_COMMENT,
} from './constants'
import {
  ISelectBlogPayload,
  IChangeBlogUiPayload,
  IChangeBlogDomainPayload,
  IBlogSuccessPayload,
  IBlogErrorPayload,
  ICreateBlogCommentPayload,
  ICreateBlogCommentErrorPayload,
  ICreateBlogCommentSuccessPayload,
  IUpdateBlogCommentSuccessPayload,
  IUpdateBlogCommentErrorPayload,
  IDeleteBlogCommentSuccessPayload,
  IDeleteBlogCommentErrorPayload,
  IUpdateBlogCommentPayload,
  IDeleteBlogCommentPayload,
} from './payloads'

export const initialState: IBlogState = {
  blogUi: {
    id: '',
    nickname: '',
    title: '',
    contents: '',
    blogFilePath: '',
    userFilePath: '',
    createdAt: '',
    blogComment: [],
  },
  blogDomain: {
    id: '',
    title: '',
    contents: '',
    filePath: '',
    fileName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: [],
  },
  blogIsSuccess: false,
  blogErrorMessage: '',
  blogIsLoading: false,
  createBlogCommentIsSuccess: false,
  createBlogCommentErrorMessage: '',
  createBlogCommentIsLoading: false,
  updateBlogCommentIsSuccess: false,
  updateBlogCommentErrorMessage: '',
  updateBlogCommentIsLoading: false,
  deleteBlogCommentIsSuccess: false,
  deleteBlogCommentErrorMessage: '',
  deleteBlogCommentIsLoading: false,
}

export default handleActions<IBlogState>(
  {
    [SELECT_BLOG]: (
      state,
      action: ReduxActions.Action<ISelectBlogPayload>
    ) => ({ ...state, blogIsLoading: true, ...action.payload }),
    [CHANGE_BLOG_UI]: (
      state,
      action: ReduxActions.Action<IChangeBlogUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_BLOG_DOMAIN]: (
      state,
      action: ReduxActions.Action<IChangeBlogDomainPayload>
    ) => ({ ...state, ...action.payload }),
    [BLOG_SUCCESS]: (
      state,
      action: ReduxActions.Action<IBlogSuccessPayload>
    ) => ({ ...state, blogIsLoading: false, ...action.payload }),
    [BLOG_ERROR]: (state, action: ReduxActions.Action<IBlogErrorPayload>) => ({
      ...state,
      blogIsLoading: false,
      ...action.payload,
    }),
    [CREATE_BLOG_COMMENT]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentPayload>
    ) => ({ ...state, blogIsLoading: true, ...action.payload }),
    [CREATE_BLOG_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentSuccessPayload>
    ) => ({ ...state, createBlogCommentIsLoading: false, ...action.payload }),
    [CREATE_BLOG_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentErrorPayload>
    ) => ({
      ...state,
      createBlogCommentIsLoading: false,
      ...action.payload,
    }),
    [UPDATE_BLOG_COMMENT]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentPayload>
    ) => ({ ...state, updateBlogCommentIsLoading: true, ...action.payload }),
    [UPDATE_BLOG_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentSuccessPayload>
    ) => ({ ...state, updateBlogCommentIsLoading: false, ...action.payload }),
    [UPDATE_BLOG_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentErrorPayload>
    ) => ({
      ...state,
      updateBlogCommentIsLoading: false,
      ...action.payload,
    }),
    [DELETE_BLOG_COMMENT]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentPayload>
    ) => ({ ...state, deleteBlogCommentIsLoading: true, ...action.payload }),
    [DELETE_BLOG_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentSuccessPayload>
    ) => ({ ...state, deleteBlogCommentIsLoading: false, ...action.payload }),
    [DELETE_BLOG_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentErrorPayload>
    ) => ({
      ...state,
      deleteBlogCommentIsLoading: false,
      ...action.payload,
    }),
    [INITIAL_BLOG_STATE]: (state, action: ReduxActions.Action<IBlogState>) =>
      action.payload,
  },
  initialState
)
