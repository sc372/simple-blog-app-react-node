import { IBlogFormUi } from '../../models'

export interface IBlogFormState {
  readonly blogFormUi: IBlogFormUi
  readonly createBlogIsSuccess: boolean
  readonly createBlogIsLoading: boolean
  readonly createBlogErrorMessage: string
  readonly deleteBlogIsSuccess: boolean
  readonly deleteBlogIsLoading: boolean
  readonly deleteBlogErrorMessage: string
  readonly updateBlogIsSuccess: boolean
  readonly updateBlogIsLoading: boolean
  readonly updateBlogErrorMessage: string
}
