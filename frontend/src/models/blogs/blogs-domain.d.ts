import { IBlogsCommentDomain } from './blogs-comment-domain'

export interface IBlogsDomain {
  readonly id: string
  readonly title: string
  readonly contents: string
  readonly filePath: string
  readonly fileName: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly comments: IBlogsCommentDomain[]
}
