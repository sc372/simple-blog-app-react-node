export interface CreateBlogCommentDTO {
  userId: string
  blogId: string
  comment: string
}

export interface UpdateBlogCommentDTO {
  blogCommentId: string
  comment: string
}
