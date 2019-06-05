import { IBlogsCommentCommentDomain } from './blogs-comment-comment-domain'

export interface IBlogsCommentDomain {
  readonly id: string
  readonly comment: string
  readonly userId: string
  readonly userNickname: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly blogCommentComments: IBlogsCommentCommentDomain[]
}
