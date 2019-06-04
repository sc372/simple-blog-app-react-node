import { IMyBlogsUi, IMyBlogsDomain } from '../../models'

export interface IMyBlogsState {
  readonly myBlogsUi: IMyBlogsUi[]
  readonly myBlogsDomain: IMyBlogsDomain[]
  readonly myBlogsPageNum: number
  readonly myBlogsTotalCount: number
  readonly myBlogsSearchText: string
  readonly myBlogsIsSuccess: boolean
  readonly myBlogsIsLoading: boolean
  readonly myBlogsErrorMessage: string
}
