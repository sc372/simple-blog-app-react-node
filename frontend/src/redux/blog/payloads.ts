import { IBlogsUi, IBlogsDomain } from '../../models'

export interface ISelectBlogPayload {
  readonly blogIsLoading: boolean
}

export interface IChangeBlogUiPayload {
  readonly blogUi: IBlogsUi
}

export interface IChangeBlogDomainPayload {
  readonly blogDomain: IBlogsDomain
}

export interface IBlogSuccessPayload {
  readonly blogIsSuccess: boolean
}

export interface IBlogErrorPayload {
  readonly blogErrorMessage: string
}

export interface ICreateBlogCommentPayload {
  readonly createBlogCommentIsLoading: boolean
}

export interface ICreateBlogCommentSuccessPayload {
  readonly createBlogCommentIsSuccess: boolean
}

export interface ICreateBlogCommentErrorPayload {
  readonly createBlogCommentErrorMessage: string
}

export interface IUpdateBlogCommentPayload {
  readonly updateBlogCommentIsLoading: boolean
}

export interface IUpdateBlogCommentSuccessPayload {
  readonly updateBlogCommentIsSuccess: boolean
}

export interface IUpdateBlogCommentErrorPayload {
  readonly updateBlogCommentErrorMessage: string
}

export interface IDeleteBlogCommentPayload {
  readonly deleteBlogCommentIsLoading: boolean
}

export interface IDeleteBlogCommentSuccessPayload {
  readonly deleteBlogCommentIsSuccess: boolean
}

export interface IDeleteBlogCommentErrorPayload {
  readonly deleteBlogCommentErrorMessage: string
}
