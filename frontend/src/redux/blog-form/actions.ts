import { createAction } from 'redux-actions'
import {
  CHANGE_BLOG_FORM_UI,
  CREATE_BLOG,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_ERROR,
  UPDATE_BLOG,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_ERROR,
  INITIAL_BLOG_FORM_UI_STATE,
} from './constants'
import {
  IChangeBlogFormUiPayload,
  ICreateBlogPayload,
  ICreateBlogSuccessPayload,
  ICreateBlogErrorPayload,
  IDeleteBlogPayload,
  IDeleteBlogSuccessPayload,
  IDeleteBlogErrorPayload,
  IUpdateBlogPayload,
  IUpdateBlogSuccessPayload,
  IUpdateBlogErrorPayload,
} from './payloads'
import { IBlogFormUi } from '../../models'
import { initialState } from './reducer'

export const changeBlogFormUi = createAction<
  IChangeBlogFormUiPayload,
  IBlogFormUi
>(CHANGE_BLOG_FORM_UI, blogFormUi => ({ blogFormUi }))

export const createBlog = createAction<ICreateBlogPayload>(CREATE_BLOG, () => ({
  createBlogIsLoading: true,
}))

export const createBlogSuccess = createAction<ICreateBlogSuccessPayload>(
  CREATE_BLOG_SUCCESS,
  () => ({ createBlogIsSuccess: true })
)

export const createBlogError = createAction<ICreateBlogErrorPayload, string>(
  CREATE_BLOG_ERROR,
  createBlogErrorMessage => ({
    createBlogErrorMessage,
    createBlogIsSuccess: false,
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

export const updateBlog = createAction<IUpdateBlogPayload>(UPDATE_BLOG, () => ({
  updateBlogIsLoading: true,
}))

export const updateBlogSuccess = createAction<IUpdateBlogSuccessPayload>(
  UPDATE_BLOG_SUCCESS,
  () => ({ updateBlogIsSuccess: true })
)

export const updateBlogError = createAction<IUpdateBlogErrorPayload, string>(
  UPDATE_BLOG_ERROR,
  updateBlogErrorMessage => ({
    updateBlogErrorMessage,
    updateBlogIsSuccess: false,
  })
)

export const initialBlogFormUiState = createAction(
  INITIAL_BLOG_FORM_UI_STATE,
  () => initialState
)
