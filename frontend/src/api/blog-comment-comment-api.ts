import { AxiosWithJwt } from '../utils/http'

export interface IPostBlogCommentApi {
  readonly blogId: string
  readonly userId: string
  readonly comment: string
  readonly jwtToken: string
}

export interface IPutBlogCommentApi {
  readonly blogCommentId: string
  readonly comment: string
  readonly jwtToken: string
}

export interface IDeleteBlogCommentApi {
  readonly blogCommentId: string
  readonly jwtToken: string
}

export const postBlogCommentApi = (data: IPostBlogCommentApi) =>
  AxiosWithJwt(data.jwtToken)
    .post('v1/blog-comments', {
      userId: data.userId,
      blogId: data.blogId,
      comment: data.comment,
    })
    .then(res => res)
    .catch(err => err.response)

export const putBlogCommentApi = (data: IPutBlogCommentApi) =>
  AxiosWithJwt(data.jwtToken)
    .put('v1/blog-comments', {
      blogCommentId: data.blogCommentId,
      comment: data.comment,
    })
    .then(res => res)
    .catch(err => err.response)

export const deleteBlogCommentApi = (data: IDeleteBlogCommentApi) =>
  AxiosWithJwt(data.jwtToken)
    .delete(`v1/blog-comments/${data.blogCommentId}`)
    .then(res => res)
    .catch(err => err.response)
