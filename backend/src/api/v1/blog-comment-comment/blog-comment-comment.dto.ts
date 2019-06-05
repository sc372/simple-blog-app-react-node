export interface CreateBlogCommentCommentDTO {
  userId: string
  blogId: string
  blogCommentId: string
  comment: string
}

export interface UpdateBlogCommentCommentDTO {
  blogCommentCommentId: string
  comment: string
}
