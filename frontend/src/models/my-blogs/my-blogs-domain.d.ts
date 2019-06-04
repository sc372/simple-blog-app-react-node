export interface IMyBlogsDomain {
  readonly id: string
  readonly title: string
  readonly contents: string
  readonly filePath: string
  readonly fileName: string
  readonly createdAt: Date
  readonly updatedAt: Date
}
