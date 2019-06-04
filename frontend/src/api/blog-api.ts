import { Axios, AxiosWithJwt } from '../utils/http'

export interface IGetBlogsApi {
  readonly pageNum: number
  readonly searchText: number
}

export interface IGetMyBlogsApi {
  readonly accountId: string
  readonly pageNum: number
  readonly searchText: number
  readonly jwtToken: string
}

export interface IPostCreateBlogApi {
  readonly title: string
  readonly userId: string
  readonly contents: string
  readonly filePath: string
  readonly fileName: string
  readonly jwtToken: string
}

export interface IPutUpdateBlogApi {
  readonly blogId: string
  readonly title: string
  readonly userId: string
  readonly contents: string
  readonly filePath: string
  readonly fileName: string
  readonly jwtToken: string
}

export interface IDeleteBlogApi {
  readonly blogId: string
  readonly jwtToken: string
}

export const getBlogApi = (blogId: string) =>
  Axios()
    .get(`v1/blogs/${blogId}/public`)
    .then(res => res)
    .catch(err => err.response)

export const getBlogsApi = (data: IGetBlogsApi) =>
  Axios()
    .get(`v1/blogs/public`, {
      params: { page: data.pageNum, search: data.searchText || '' },
    })
    .then(res => res)
    .catch(err => err.response)

export const getMyBlogsApi = (data: IGetMyBlogsApi) =>
  AxiosWithJwt(data.jwtToken)
    .get(`v1/blogs/users/${data.accountId}`, {
      params: { page: data.pageNum, search: data.searchText || '' },
    })
    .then(res => res)
    .catch(err => err.response)

export const postBlogApi = (data: IPostCreateBlogApi) =>
  AxiosWithJwt(data.jwtToken)
    .post('v1/blogs', {
      userId: data.userId,
      title: data.title,
      contents: data.contents,
      filePath: data.filePath,
      fileName: data.fileName,
    })
    .then(res => res)
    .catch(err => err.response)

export const putBlogApi = (data: IPutUpdateBlogApi) =>
  AxiosWithJwt(data.jwtToken)
    .put(`v1/blogs/${data.blogId}`, {
      userId: data.userId,
      title: data.title,
      contents: data.contents,
      filePath: data.filePath,
      fileName: data.fileName,
    })
    .then(res => res)
    .catch(err => err.response)

export const deleteBlogApi = (data: IDeleteBlogApi) =>
  AxiosWithJwt(data.jwtToken)
    .delete(`v1/blogs/${data.blogId}`)
    .then(res => res)
    .catch(err => err.response)
