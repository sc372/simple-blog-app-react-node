import { IMyBlogsUi, IMyBlogsDomain } from '../../models'

export interface ISelectMyBlogsPayload {
  readonly myBlogsIsLoading: boolean
  readonly myBlogsPageNum: number
}

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

export interface IMyBlogsSuccessPayload {
  readonly myBlogsIsSuccess: boolean
}

export interface IMyBlogsErrorPayload {
  readonly myBlogsErrorMessage: string
}
