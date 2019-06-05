import { handleActions } from 'redux-actions'
import { IBlogState } from './state'
import {
  CHANGE_BLOG_UI,
  CHANGE_BLOG_DOMAIN,
  SELECT_BLOG,
  SELECT_BLOG_SUCCESS,
  SELECT_BLOG_ERROR,
  CREATE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_ERROR,
  CREATE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_SUCCESS,
  UPDATE_BLOG_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_SUCCESS,
  UPDATE_BLOG_COMMENT,
  DELETE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_COMMENT,
  CREATE_BLOG_COMMENT_COMMENT_SUCCESS,
  CREATE_BLOG_COMMENT_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_COMMENT,
  UPDATE_BLOG_COMMENT_COMMENT_SUCCESS,
  UPDATE_BLOG_COMMENT_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_COMMENT,
  DELETE_BLOG_COMMENT_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_COMMENT_ERROR,
  INITIAL_BLOG_STATE,
  INITIAL_BLOG_OTHER_DATA_STATE,
} from './constants'
import {
  IChangeBlogUiPayload,
  IChangeBlogDomainPayload,
  ISelectBlogPayload,
  ISelectBlogSuccessPayload,
  ISelectBlogErrorPayload,
  ICreateBlogCommentPayload,
  ICreateBlogCommentErrorPayload,
  ICreateBlogCommentSuccessPayload,
  IUpdateBlogCommentSuccessPayload,
  IUpdateBlogCommentErrorPayload,
  IDeleteBlogCommentSuccessPayload,
  IDeleteBlogCommentErrorPayload,
  IUpdateBlogCommentPayload,
  IDeleteBlogCommentPayload,
  ICreateBlogCommentCommentPayload,
  ICreateBlogCommentCommentSuccessPayload,
  ICreateBlogCommentCommentErrorPayload,
  IUpdateBlogCommentCommentPayload,
  IUpdateBlogCommentCommentSuccessPayload,
  IUpdateBlogCommentCommentErrorPayload,
  IDeleteBlogCommentCommentPayload,
  IDeleteBlogCommentCommentSuccessPayload,
  IDeleteBlogCommentCommentErrorPayload,
  IInitialBlogOtherDataStatePayload,
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
    blogComments: [],
  },
  blogDomain: {
    id: '',
    title: '',
    contents: '',
    filePath: '',
    fileName: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    blogComments: [],
    user: {
      id: '',
      email: '',
      nickname: '',
      jwtToken: '',
      filePath: '',
      fileName: '',
      createdAt: new Date(),
    },
  },
  selectBlogIsSuccess: false,
  selectBlogErrorMessage: '',
  selectBlogIsLoading: false,
  createBlogCommentIsSuccess: false,
  createBlogCommentErrorMessage: '',
  createBlogCommentIsLoading: false,
  updateBlogCommentIsSuccess: false,
  updateBlogCommentErrorMessage: '',
  updateBlogCommentIsLoading: false,
  deleteBlogCommentIsSuccess: false,
  deleteBlogCommentErrorMessage: '',
  deleteBlogCommentIsLoading: false,
  createBlogCommentCommentIsSuccess: false,
  createBlogCommentCommentErrorMessage: '',
  createBlogCommentCommentIsLoading: false,
  updateBlogCommentCommentIsSuccess: false,
  updateBlogCommentCommentErrorMessage: '',
  updateBlogCommentCommentIsLoading: false,
  deleteBlogCommentCommentIsSuccess: false,
  deleteBlogCommentCommentErrorMessage: '',
  deleteBlogCommentCommentIsLoading: false,
}

export default handleActions<IBlogState>(
  {
    [CHANGE_BLOG_UI]: (
      state,
      action: ReduxActions.Action<IChangeBlogUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_BLOG_DOMAIN]: (
      state,
      action: ReduxActions.Action<IChangeBlogDomainPayload>
    ) => ({ ...state, ...action.payload }),
    [SELECT_BLOG]: (
      state,
      action: ReduxActions.Action<ISelectBlogPayload>
    ) => ({ ...state, selectBlogIsLoading: true, ...action.payload }),
    [SELECT_BLOG_SUCCESS]: (
      state,
      action: ReduxActions.Action<ISelectBlogSuccessPayload>
    ) => ({ ...state, selectBlogIsLoading: false, ...action.payload }),
    [SELECT_BLOG_ERROR]: (
      state,
      action: ReduxActions.Action<ISelectBlogErrorPayload>
    ) => ({
      ...state,
      selectBlogIsLoading: false,
      ...action.payload,
    }),

    // blog-comment
    [CREATE_BLOG_COMMENT]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentPayload>
    ) => ({ ...state, createBlogCommentIsLoading: true, ...action.payload }),
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
    // blog-comment-comment
    [CREATE_BLOG_COMMENT_COMMENT]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentCommentPayload>
    ) => ({
      ...state,
      createBlogCommentCommentIsLoading: true,
      ...action.payload,
    }),
    [CREATE_BLOG_COMMENT_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentCommentSuccessPayload>
    ) => ({
      ...state,
      createBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [CREATE_BLOG_COMMENT_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<ICreateBlogCommentCommentErrorPayload>
    ) => ({
      ...state,
      createBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [UPDATE_BLOG_COMMENT_COMMENT]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentCommentPayload>
    ) => ({
      ...state,
      updateBlogCommentCommentIsLoading: true,
      ...action.payload,
    }),
    [UPDATE_BLOG_COMMENT_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentCommentSuccessPayload>
    ) => ({
      ...state,
      updateBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [UPDATE_BLOG_COMMENT_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<IUpdateBlogCommentCommentErrorPayload>
    ) => ({
      ...state,
      updateBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [DELETE_BLOG_COMMENT_COMMENT]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentCommentPayload>
    ) => ({
      ...state,
      deleteBlogCommentCommentIsLoading: true,
      ...action.payload,
    }),
    [DELETE_BLOG_COMMENT_COMMENT_SUCCESS]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentCommentSuccessPayload>
    ) => ({
      ...state,
      deleteBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [DELETE_BLOG_COMMENT_COMMENT_ERROR]: (
      state,
      action: ReduxActions.Action<IDeleteBlogCommentCommentErrorPayload>
    ) => ({
      ...state,
      deleteBlogCommentCommentIsLoading: false,
      ...action.payload,
    }),
    [INITIAL_BLOG_OTHER_DATA_STATE]: (
      state,
      action: ReduxActions.Action<IInitialBlogOtherDataStatePayload>
    ) => ({
      ...state,
      ...action.payload,
    }),
    [INITIAL_BLOG_STATE]: (state, action: ReduxActions.Action<IBlogState>) =>
      action.payload,
  },
  initialState
)
