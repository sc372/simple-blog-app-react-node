import { IMyBlogsUi, IMyBlogsDomain } from '../../models'

export interface IMyBlogsState {
  readonly myBlogsUi: IMyBlogsUi[]
  readonly myBlogsDomain: IMyBlogsDomain[]
  readonly myBlogsPageNum: number
  readonly myBlogsTotalCount: number
  readonly myBlogsSearchText: string
  readonly selectMyBlogsIsSuccess: boolean
  readonly selectMyBlogsIsLoading: boolean
  readonly selectMyBlogsErrorMessage: string
}
