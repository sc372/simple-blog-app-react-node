import { IBlogsUi, IBlogsDomain } from '../../models'

export interface IBlogState {
  readonly blogUi: IBlogsUi
  readonly blogDomain: IBlogsDomain
  readonly blogIsSuccess: boolean
  readonly blogErrorMessage: string
  readonly blogIsLoading: boolean
  readonly createBlogCommentIsSuccess: boolean
  readonly createBlogCommentErrorMessage: string
  readonly createBlogCommentIsLoading: boolean
  readonly updateBlogCommentIsSuccess: boolean
  readonly updateBlogCommentErrorMessage: string
  readonly updateBlogCommentIsLoading: boolean
  readonly deleteBlogCommentIsSuccess: boolean
  readonly deleteBlogCommentErrorMessage: string
  readonly deleteBlogCommentIsLoading: boolean
}
