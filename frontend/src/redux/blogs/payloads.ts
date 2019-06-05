import { IBlogsUi, IBlogsDomain } from '../../models'

export interface ISelectBlogsPayload {
  readonly selectBlogsIsLoading: boolean
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

export interface ISelectBlogsSuccessPayload {
  readonly selectBlogsIsSuccess: boolean
}

export interface ISelectBlogsErrorPayload {
  readonly selectBlogsErrorMessage: string
}
