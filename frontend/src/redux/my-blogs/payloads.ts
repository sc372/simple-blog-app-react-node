import { IMyBlogsUi, IMyBlogsDomain } from '../../models'

export interface IChangeMyBlogsUiPayload {
  readonly myBlogsUi: IMyBlogsUi[]
}

export interface IChangeMyBlogsDomainPayload {
  readonly myBlogsDomain: IMyBlogsDomain[]
}

export interface IChangeMyBlogsTotalCountPayload {
  readonly myBlogsTotalCount: number
}

export interface IChangeMyBlogsSearchTextPayload {
  readonly myBlogsSearchText: string
}

export interface ISelectMyBlogsPayload {
  readonly selectMyBlogsIsLoading: boolean
  readonly myBlogsPageNum: number
}

export interface ISelectMyBlogsSuccessPayload {
  readonly selectMyBlogsIsSuccess: boolean
}

export interface ISelectMyBlogsErrorPayload {
  readonly selectMyBlogsErrorMessage: string
}
