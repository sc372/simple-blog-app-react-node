import { IBlogsUi, IBlogsDomain } from '../../models'

export interface IBlogState {
  readonly blogUi: IBlogsUi
  readonly blogDomain: IBlogsDomain
  readonly selectBlogIsSuccess: boolean
  readonly selectBlogErrorMessage: string
  readonly selectBlogIsLoading: boolean
  // blog-comment
  readonly createBlogCommentIsSuccess: boolean
  readonly createBlogCommentErrorMessage: string
  readonly createBlogCommentIsLoading: boolean
  readonly updateBlogCommentIsSuccess: boolean
  readonly updateBlogCommentErrorMessage: string
  readonly updateBlogCommentIsLoading: boolean
  readonly deleteBlogCommentIsSuccess: boolean
  readonly deleteBlogCommentErrorMessage: string
  readonly deleteBlogCommentIsLoading: boolean
  // blog-comment-comment
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
