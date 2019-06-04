import { IBlogFormUi } from '../../models'

export interface IChangeBlogFormUiPayload {
  readonly blogFormUi: IBlogFormUi
}

export interface ICreateBlogPayload {
  readonly blogFormIsLoading: boolean
}

export interface IUpdateBlogPayload {
  readonly blogFormIsLoading: boolean
}

export interface IBlogFormSuccessPayload {
  readonly blogFormIsSuccess: boolean
}

export interface IBlogFormErrorPayload {
  readonly blogFormErrorMessage: string
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
