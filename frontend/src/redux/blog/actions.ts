import { createAction } from 'redux-actions'
import {
  SELECT_BLOG,
  CHANGE_BLOG_UI,
  CHANGE_BLOG_DOMAIN,
  SELECT_BLOG_SUCCESS,
  SELECT_BLOG_ERROR,
  // blog-comment
  CREATE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_SUCCESS,
  CREATE_BLOG_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT,
  // blog-comment-comment
  CREATE_BLOG_COMMENT_COMMENT,
  CREATE_BLOG_COMMENT_COMMENT_SUCCESS,
  CREATE_BLOG_COMMENT_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_COMMENT,
  UPDATE_BLOG_COMMENT_COMMENT,
  INITIAL_BLOG_OTHER_DATA_STATE,
  INITIAL_BLOG_STATE,
} from './constants'
import {
  IChangeBlogUiPayload,
  IChangeBlogDomainPayload,
  ISelectBlogPayload,
  ISelectBlogSuccessPayload,
  ISelectBlogErrorPayload,
  // blog-comment
  ICreateBlogCommentPayload,
  ICreateBlogCommentSuccessPayload,
  ICreateBlogCommentErrorPayload,
  IUpdateBlogCommentSuccessPayload,
  IDeleteBlogCommentSuccessPayload,
  IDeleteBlogCommentErrorPayload,
  IUpdateBlogCommentErrorPayload,
  IUpdateBlogCommentPayload,
  IDeleteBlogCommentPayload,
  // blog-comment-comment
  ICreateBlogCommentCommentPayload,
  ICreateBlogCommentCommentSuccessPayload,
  ICreateBlogCommentCommentErrorPayload,
  IUpdateBlogCommentCommentSuccessPayload,
  IDeleteBlogCommentCommentSuccessPayload,
  IDeleteBlogCommentCommentErrorPayload,
  IUpdateBlogCommentCommentErrorPayload,
  IUpdateBlogCommentCommentPayload,
  IDeleteBlogCommentCommentPayload,
  IInitialBlogOtherDataStatePayload,
} from './payloads'
import { IBlogsUi, IBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const changeBlogUi = createAction<IChangeBlogUiPayload, IBlogsUi>(
  CHANGE_BLOG_UI,
  blogUi => ({ blogUi })
)

export const changeBlogDomain = createAction<
  IChangeBlogDomainPayload,
  IBlogsDomain
>(CHANGE_BLOG_DOMAIN, blogDomain => ({ blogDomain }))

export const selectBlog = createAction<ISelectBlogPayload, any>(
  SELECT_BLOG,
  blogId => ({
    selectBlogIsLoading: true,
    blogId,
  })
)

export const selectBlogSuccess = createAction<ISelectBlogSuccessPayload>(
  SELECT_BLOG_SUCCESS,
  () => ({ selectBlogIsSuccess: true })
)

export const selectBlogError = createAction<ISelectBlogErrorPayload, string>(
  SELECT_BLOG_ERROR,
  selectBlogErrorMessage => ({
    selectBlogErrorMessage,
    selectBlogIsSuccess: false,
  })
)

// blog-comment
export const createBlogComment = createAction<
  ICreateBlogCommentPayload,
  string
>(CREATE_BLOG_COMMENT, comment => ({
  createBlogCommentIsLoading: true,
  comment,
}))

export const createBlogCommentSuccess = createAction<
  ICreateBlogCommentSuccessPayload
>(CREATE_BLOG_COMMENT_SUCCESS, () => ({ createBlogCommentIsSuccess: true }))

export const createBlogCommentError = createAction<
  ICreateBlogCommentErrorPayload,
  string
>(CREATE_BLOG_COMMENT_ERROR, createBlogCommentErrorMessage => ({
  createBlogCommentErrorMessage,
  createBlogCommentIsSuccess: false,
}))

export const updateBlogComment = createAction<
  IUpdateBlogCommentPayload,
  string,
  string
>(UPDATE_BLOG_COMMENT, (comment, blogCommentId) => ({
  updateBlogCommentIsLoading: true,
  comment,
  blogCommentId,
}))

export const updateBlogCommentSuccess = createAction<
  IUpdateBlogCommentSuccessPayload
>(UPDATE_BLOG_COMMENT_SUCCESS, () => ({ updateBlogCommentIsSuccess: true }))

export const updateBlogCommentError = createAction<
  IUpdateBlogCommentErrorPayload,
  string
>(UPDATE_BLOG_COMMENT_ERROR, updateBlogCommentErrorMessage => ({
  updateBlogCommentErrorMessage,
  updateBlogCommentIsSuccess: false,
}))

export const deleteBlogComment = createAction<
  IDeleteBlogCommentPayload,
  string
>(DELETE_BLOG_COMMENT, commentId => ({
  deleteBlogCommentIsLoading: true,
  commentId,
}))

export const deleteBlogCommentSuccess = createAction<
  IDeleteBlogCommentSuccessPayload
>(DELETE_BLOG_COMMENT_SUCCESS, () => ({ deleteBlogCommentIsSuccess: true }))

export const deleteBlogCommentError = createAction<
  IDeleteBlogCommentErrorPayload,
  string
>(DELETE_BLOG_COMMENT_ERROR, deleteBlogCommentErrorMessage => ({
  deleteBlogCommentErrorMessage,
  deleteBlogCommentIsSuccess: false,
}))

// blog-comment-comment
export const createBlogCommentComment = createAction<
  ICreateBlogCommentCommentPayload,
  string,
  string
>(CREATE_BLOG_COMMENT_COMMENT, (comment, blogCommentId) => ({
  createBlogCommentCommentIsLoading: true,
  comment,
  blogCommentId,
}))

export const createBlogCommentCommentSuccess = createAction<
  ICreateBlogCommentCommentSuccessPayload
>(CREATE_BLOG_COMMENT_COMMENT_SUCCESS, () => ({
  createBlogCommentCommentIsSuccess: true,
}))

export const createBlogCommentCommentError = createAction<
  ICreateBlogCommentCommentErrorPayload,
  string
>(CREATE_BLOG_COMMENT_COMMENT_ERROR, createBlogCommentCommentErrorMessage => ({
  createBlogCommentCommentErrorMessage,
  createBlogCommentCommentIsSuccess: false,
}))

export const updateBlogCommentComment = createAction<
  IUpdateBlogCommentCommentPayload,
  string,
  string
>(UPDATE_BLOG_COMMENT_COMMENT, (comment, blogCommentCommentId) => ({
  updateBlogCommentCommentIsLoading: true,
  comment,
  blogCommentCommentId,
}))

export const updateBlogCommentCommentSuccess = createAction<
  IUpdateBlogCommentCommentSuccessPayload
>(UPDATE_BLOG_COMMENT_COMMENT_SUCCESS, () => ({
  updateBlogCommentCommentIsSuccess: true,
}))

export const updateBlogCommentCommentError = createAction<
  IUpdateBlogCommentCommentErrorPayload,
  string
>(UPDATE_BLOG_COMMENT_COMMENT_ERROR, updateBlogCommentCommentErrorMessage => ({
  updateBlogCommentCommentErrorMessage,
  updateBlogCommentCommentIsSuccess: false,
}))

export const deleteBlogCommentComment = createAction<
  IDeleteBlogCommentCommentPayload,
  string,
  string
>(DELETE_BLOG_COMMENT_COMMENT, (blogCommentCommentId, blogCommentId) => ({
  deleteBlogCommentCommentIsLoading: true,
  blogCommentCommentId,
  blogCommentId,
}))

export const deleteBlogCommentCommentSuccess = createAction<
  IDeleteBlogCommentCommentSuccessPayload
>(DELETE_BLOG_COMMENT_COMMENT_SUCCESS, () => ({
  deleteBlogCommentCommentIsSuccess: true,
}))

export const deleteBlogCommentCommentError = createAction<
  IDeleteBlogCommentCommentErrorPayload,
  string
>(DELETE_BLOG_COMMENT_COMMENT_ERROR, deleteBlogCommentCommentErrorMessage => ({
  deleteBlogCommentCommentErrorMessage,
  deleteBlogCommentCommentIsSuccess: false,
}))

export const initialBlogOtherDataState = createAction<
  IInitialBlogOtherDataStatePayload
>(INITIAL_BLOG_OTHER_DATA_STATE, () => ({
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
}))

export const initialBlogState = createAction(
  INITIAL_BLOG_STATE,
  () => initialState
)
