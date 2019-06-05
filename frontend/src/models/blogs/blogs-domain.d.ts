import { IBlogsCommentDomain } from './blogs-comment-domain'
import { IAccountDomain } from '../account'

export interface IBlogsDomain {
  readonly id: string
  readonly title: string
  readonly contents: string
  readonly filePath: string
  readonly fileName: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly blogComments: IBlogsCommentDomain[]
  readonly user: IAccountDomain
}
