import { IBlogsUi, IBlogsDomain } from '../../models'

export interface IBlogsState {
  readonly blogsUi: IBlogsUi[]
  readonly blogsDomain: IBlogsDomain[]
  readonly blogsPageNum: number
  readonly blogsTotalCount: number
  readonly blogsSearchText: string
  readonly selectBlogsIsSuccess: boolean
  readonly selectBlogsIsLoading: boolean
  readonly selectBlogsErrorMessage: string
}
