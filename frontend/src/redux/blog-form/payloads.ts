import { IBlogFormUi } from '../../models'

export interface IChangeBlogFormUiPayload {
  readonly blogFormUi: IBlogFormUi
}

export interface ICreateBlogPayload {
  readonly createBlogIsLoading: boolean
}

export interface ICreateBlogSuccessPayload {
  readonly createBlogIsSuccess: boolean
}

export interface ICreateBlogErrorPayload {
  readonly createBlogErrorMessage: string
}

export interface IDeleteBlogPayload {
  readonly deleteBlogIsLoading: boolean
}

export interface IDeleteBlogSuccessPayload {
  readonly deleteBlogIsSuccess: boolean
}

export interface IDeleteBlogErrorPayload {
  readonly deleteBlogErrorMessage: string
}

export interface IUpdateBlogPayload {
  readonly updateBlogIsLoading: boolean
}

export interface IUpdateBlogSuccessPayload {
  readonly updateBlogIsSuccess: boolean
}

export interface IUpdateBlogErrorPayload {
  readonly updateBlogErrorMessage: string
}
