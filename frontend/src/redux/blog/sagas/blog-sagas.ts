import { call, put } from 'redux-saga/effects'
import * as R from 'ramda'
import moment from 'moment'

import {
  changeBlogDomain,
  changeBlogUi,
  initialBlogState,
  selectBlogError,
  selectBlogSuccess,
} from '../actions'
import { getBlogApi } from '../../../api/blog-api'
import {
  IBlogsCommentCommentDomain,
  IBlogsCommentCommentUi,
  IBlogsCommentDomain,
  IBlogsCommentUi,
  IBlogsDomain,
  IBlogsUi,
} from '../../../models/blogs'

export function* selectBlogSaga({ payload }: any) {
  yield put(initialBlogState())
  const { blogId } = payload
  const response = yield call(getBlogApi, blogId)

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      const blogsDomain: IBlogsDomain = {
        id: data.id,
        title: data.title,
        contents: data.contents,
        filePath: data.filePath,
        fileName: data.fileName,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        blogComments: R.map(
          (v: IBlogsCommentDomain) => ({
            id: v.id,
            comment: v.comment,
            // @ts-ignore
            userId: v.user.id,
            // @ts-ignore
            userNickname: v.user.nickname,
            createdAt: v.createdAt,
            updatedAt: v.updatedAt,
            blogCommentComments: R.map(
              (vv: IBlogsCommentCommentDomain) => ({
                id: vv.id,
                comment: vv.comment,
                // @ts-ignore
                userId: vv.user.id,
                // @ts-ignore
                userNickname: vv.user.nickname,
                createdAt: vv.createdAt,
                updatedAt: vv.updatedAt,
              }),
              R.reverse(R.sortBy(vv => vv.createdAt, v.blogCommentComments))
            ),
          }),
          R.reverse(R.sortBy(vv => vv.createdAt, data.blogComments))
        ),
        user: {
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          jwtToken: data.jwtToken,
          filePath: data.filePath,
          fileName: data.fileName,
          createdAt: data.createdAt,
        },
      }

      const blogsUi: IBlogsUi = {
        id: data.id,
        title: data.title,
        nickname: data.user.nickname,
        contents: data.contents,
        blogFilePath: data.filePath,
        userFilePath: data.user.filePath,
        blogComments: R.map(
          (v: IBlogsCommentUi) => ({
            id: v.id,
            comment: v.comment,
            // @ts-ignore
            userId: v.user.id,
            // @ts-ignore
            userNickname: v.user.nickname,
            // @ts-ignore
            userFilePath: v.user.filePath,
            createdAt: moment(v.createdAt).format('YYYY/MM/DD hh:mm a'),
            blogCommentComments: R.map(
              (vv: IBlogsCommentCommentUi) => ({
                id: vv.id,
                comment: vv.comment,
                // @ts-ignore
                userId: vv.user.id,
                // @ts-ignore
                userNickname: vv.user.nickname,
                // @ts-ignore
                userFilePath: vv.user.filePath,
                createdAt: moment(vv.createdAt).format('YYYY/MM/DD hh:mm a'),
              }),
              R.reverse(R.sortBy(vvv => vvv.createdAt, v.blogCommentComments))
            ),
          }),
          R.reverse(R.sortBy(vv => vv.createdAt, data.blogComments))
        ),
        createdAt: moment(data.createdAt).format('YYYY/MM/DD hh:mm a'),
      }

      yield put(changeBlogDomain(blogsDomain))
      yield put(changeBlogUi(blogsUi))
      yield put(selectBlogSuccess())
    } else {
      yield put(selectBlogError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(selectBlogError(response.data.data))
  }
}
