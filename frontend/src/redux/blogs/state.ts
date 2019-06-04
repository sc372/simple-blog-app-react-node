import { IBlogsUi, IBlogsDomain } from '../../models'

export interface IBlogsState {
  readonly blogsUi: IBlogsUi[]
  readonly blogsDomain: IBlogsDomain[]
  readonly blogsPageNum: number
  readonly blogsTotalCount: number
  readonly blogsSearchText: string
  readonly blogsIsSuccess: boolean
  readonly blogsIsLoading: boolean
  readonly blogsErrorMessage: string
}
