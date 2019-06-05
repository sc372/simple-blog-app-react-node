import { AxiosWithJwt } from '../utils/http'

export interface IPostBlogCommentCommentApi {
  readonly blogId: string
  readonly blogCommentId: string
  readonly userId: string
  readonly comment: string
  readonly jwtToken: string
}

export interface IPutBlogCommentCommentApi {
  readonly blogCommentCommentId: string
  readonly comment: string
  readonly jwtToken: string
}

export interface IDeleteBlogCommentCommentApi {
  readonly blogCommentCommentId: string
  readonly jwtToken: string
}

export const postBlogCommentCommentApi = (data: IPostBlogCommentCommentApi) =>
  AxiosWithJwt(data.jwtToken)
    .post('v1/blog-comment-comments', {
      userId: data.userId,
      blogId: data.blogId,
      blogCommentId: data.blogCommentId,
      comment: data.comment,
    })
    .then(res => res)
    .catch(err => err.response)

export const putBlogCommentCommentApi = (data: IPutBlogCommentCommentApi) =>
  AxiosWithJwt(data.jwtToken)
    .put('v1/blog-comment-comments', {
      blogCommentCommentId: data.blogCommentCommentId,
      comment: data.comment,
    })
    .then(res => res)
    .catch(err => err.response)

export const deleteBlogCommentCommentApi = (
  data: IDeleteBlogCommentCommentApi
) =>
  AxiosWithJwt(data.jwtToken)
    .delete(`v1/blog-comment-comments/${data.blogCommentCommentId}`)
    .then(res => res)
    .catch(err => err.response)
