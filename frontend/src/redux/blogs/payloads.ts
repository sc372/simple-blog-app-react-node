import { IBlogsUi, IBlogsDomain } from '../../models'

export interface ISelectBlogsPayload {
  readonly blogsIsLoading: boolean
}

export interface IChangeBlogsUiPayload {
  readonly blogsUi: IBlogsUi[]
}

export interface IChangeBlogsDomainPayload {
  readonly blogsDomain: IBlogsDomain[]
}

export interface IChangeBlogsTotalCountPayload {
  readonly blogsTotalCount: number
}

export interface IChangeBlogsSearchTextPayload {
  readonly blogsSearchText: string
}

export interface IBlogsSuccessPayload {
  readonly blogsIsSuccess: boolean
}

export interface IBlogsErrorPayload {
  readonly blogsErrorMessage: string
}
