import { IBlogsCommentCommentUi } from './blogs-comment-comment-ui'

export interface IBlogsCommentUi {
  readonly id: string
  readonly comment: string
  readonly userId: string
  readonly userNickname: string
  readonly userFilePath: string
  readonly createdAt: string
  readonly blogCommentComments: IBlogsCommentCommentUi[]
}
