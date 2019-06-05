import { IBlogsUi, IBlogsDomain } from '../../models'

export interface IChangeBlogUiPayload {
  readonly blogUi: IBlogsUi
}

export interface IChangeBlogDomainPayload {
  readonly blogDomain: IBlogsDomain
}

export interface ISelectBlogPayload {
  readonly selectBlogIsLoading: boolean
}

export interface ISelectBlogSuccessPayload {
  readonly selectBlogIsSuccess: boolean
}

export interface ISelectBlogErrorPayload {
  readonly selectBlogErrorMessage: string
}

// blog-comment
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

// blog-comment-comment
export interface ICreateBlogCommentCommentPayload {
  readonly createBlogCommentCommentIsLoading: boolean
}

export interface ICreateBlogCommentCommentSuccessPayload {
  readonly createBlogCommentCommentIsSuccess: boolean
}

export interface ICreateBlogCommentCommentErrorPayload {
  readonly createBlogCommentCommentErrorMessage: string
}

export interface IUpdateBlogCommentCommentPayload {
  readonly updateBlogCommentCommentIsLoading: boolean
}

export interface IUpdateBlogCommentCommentSuccessPayload {
  readonly updateBlogCommentCommentIsSuccess: boolean
}

export interface IUpdateBlogCommentCommentErrorPayload {
  readonly updateBlogCommentCommentErrorMessage: string
}

export interface IDeleteBlogCommentCommentPayload {
  readonly deleteBlogCommentCommentIsLoading: boolean
}

export interface IDeleteBlogCommentCommentSuccessPayload {
  readonly deleteBlogCommentCommentIsSuccess: boolean
}

export interface IDeleteBlogCommentCommentErrorPayload {
  readonly deleteBlogCommentCommentErrorMessage: string
}

export interface IInitialBlogOtherDataStatePayload {
  readonly selectBlogIsSuccess: boolean
  readonly selectBlogErrorMessage: string
  readonly selectBlogIsLoading: boolean
  readonly createBlogCommentIsSuccess: boolean
  readonly createBlogCommentErrorMessage: string
  readonly createBlogCommentIsLoading: boolean
  readonly updateBlogCommentIsSuccess: boolean
  readonly updateBlogCommentErrorMessage: string
  readonly updateBlogCommentIsLoading: boolean
  readonly deleteBlogCommentIsSuccess: boolean
  readonly deleteBlogCommentErrorMessage: string
  readonly deleteBlogCommentIsLoading: boolean
  readonly createBlogCommentCommentIsSuccess: boolean
  readonly createBlogCommentCommentErrorMessage: string
  readonly createBlogCommentCommentIsLoading: boolean
  readonly updateBlogCommentCommentIsSuccess: boolean
  readonly updateBlogCommentCommentErrorMessage: string
  readonly updateBlogCommentCommentIsLoading: boolean
  readonly deleteBlogCommentCommentIsSuccess: boolean
  readonly deleteBlogCommentCommentErrorMessage: string
  readonly deleteBlogCommentCommentIsLoading: boolean
}
