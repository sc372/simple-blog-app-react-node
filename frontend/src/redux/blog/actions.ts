import { createAction } from 'redux-actions'
import {
  SELECT_BLOG,
  CREATE_BLOG_COMMENT,
  CHANGE_BLOG_UI,
  CHANGE_BLOG_DOMAIN,
  BLOG_SUCCESS,
  CREATE_BLOG_COMMENT_SUCCESS,
  BLOG_ERROR,
  CREATE_BLOG_COMMENT_ERROR,
  INITIAL_BLOG_STATE,
  UPDATE_BLOG_COMMENT_ERROR,
  UPDATE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT_ERROR,
  DELETE_BLOG_COMMENT_SUCCESS,
  DELETE_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT,
} from './constants'
import {
  ISelectBlogPayload,
  ICreateBlogCommentPayload,
  IChangeBlogUiPayload,
  IChangeBlogDomainPayload,
  IBlogSuccessPayload,
  ICreateBlogCommentSuccessPayload,
  IBlogErrorPayload,
  ICreateBlogCommentErrorPayload,
  IUpdateBlogCommentSuccessPayload,
  IDeleteBlogCommentSuccessPayload,
  IDeleteBlogCommentErrorPayload,
  IUpdateBlogCommentErrorPayload,
  IUpdateBlogCommentPayload,
  IDeleteBlogCommentPayload,
} from './payloads'
import { IBlogsUi, IBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const selectBlog = createAction<ISelectBlogPayload, any>(
  SELECT_BLOG,
  blogId => ({
    blogIsLoading: true,
    blogId,
  })
)

export const changeBlogUi = createAction<IChangeBlogUiPayload, IBlogsUi>(
  CHANGE_BLOG_UI,
  blogUi => ({ blogUi })
)

export const changeBlogDomain = createAction<
  IChangeBlogDomainPayload,
  IBlogsDomain
>(CHANGE_BLOG_DOMAIN, blogDomain => ({ blogDomain }))

export const blogSuccess = createAction<IBlogSuccessPayload>(
  BLOG_SUCCESS,
  () => ({ blogIsSuccess: true })
)

export const blogError = createAction<IBlogErrorPayload, string>(
  BLOG_ERROR,
  blogErrorMessage => ({
    blogErrorMessage,
    blogIsSuccess: false,
  })
)

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

export const initialBlogState = createAction(
  INITIAL_BLOG_STATE,
  () => initialState
)
