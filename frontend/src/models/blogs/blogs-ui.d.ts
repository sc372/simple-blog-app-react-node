import { IBlogsCommentUi } from './blogs-comment-ui'

export interface IBlogsUi {
  readonly id: string
  readonly nickname: string
  readonly title: string
  readonly contents: string
  readonly blogFilePath: string
  readonly userFilePath: string
  readonly createdAt: string
  readonly blogComments: IBlogsCommentUi[]
}
