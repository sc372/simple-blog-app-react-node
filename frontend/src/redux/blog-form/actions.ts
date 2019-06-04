import { createAction } from 'redux-actions'
import {
  CHANGE_BLOG_FORM_UI,
  CREATE_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  BLOG_FORM_SUCCESS,
  BLOG_FORM_ERROR,
  INITIAL_BLOG_FORM_UI_STATE,
  DELETE_BLOG_ERROR,
  DELETE_BLOG_SUCCESS,
} from './constants'
import {
  IChangeBlogFormUiPayload,
  ICreateBlogPayload,
  IUpdateBlogPayload,
  IDeleteBlogPayload,
  IBlogFormSuccessPayload,
  IBlogFormErrorPayload,
  IDeleteBlogSuccessPayload,
  IDeleteBlogErrorPayload,
} from './payloads'
import { IBlogFormUi } from '../../models'
import { initialState } from './reducer'

export const changeBlogFormUi = createAction<
  IChangeBlogFormUiPayload,
  IBlogFormUi
>(CHANGE_BLOG_FORM_UI, blogFormUi => ({ blogFormUi }))

export const createBlog = createAction<ICreateBlogPayload>(CREATE_BLOG, () => ({
  blogFormIsLoading: true,
}))

export const updateBlog = createAction<IUpdateBlogPayload>(UPDATE_BLOG, () => ({
  blogFormIsLoading: true,
}))

export const blogFormSuccess = createAction<IBlogFormSuccessPayload>(
  BLOG_FORM_SUCCESS,
  () => ({ blogFormIsSuccess: true })
)

export const blogFormError = createAction<IBlogFormErrorPayload, string>(
  BLOG_FORM_ERROR,
  blogFormErrorMessage => ({
    blogFormErrorMessage,
    blogFormIsSuccess: false,
  })
)

export const deleteBlog = createAction<IDeleteBlogPayload, string>(
  DELETE_BLOG,
  blogId => ({
    deleteBlogIsLoading: true,
    blogId,
  })
)

export const deleteBlogSuccess = createAction<IDeleteBlogSuccessPayload>(
  DELETE_BLOG_SUCCESS,
  () => ({ deleteBlogIsSuccess: true })
)

export const deleteBlogError = createAction<IDeleteBlogErrorPayload, string>(
  DELETE_BLOG_ERROR,
  deleteBlogErrorMessage => ({
    deleteBlogErrorMessage,
    deleteBlogIsSuccess: false,
  })
)

export const initialBlogFormUiState = createAction(
  INITIAL_BLOG_FORM_UI_STATE,
  () => initialState
)
