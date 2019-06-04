import { IBlogFormUi } from '../../models'

export interface IBlogFormState {
  readonly blogFormUi: IBlogFormUi
  readonly blogFormIsSuccess: boolean
  readonly blogFormIsLoading: boolean
  readonly blogFormErrorMessage: string
  readonly deleteBlogIsSuccess: boolean
  readonly deleteBlogIsLoading: boolean
  readonly deleteBlogErrorMessage: string
}
