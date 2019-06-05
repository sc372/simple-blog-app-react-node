import { call, put, select } from 'redux-saga/effects'
import * as R from 'ramda'
import moment from 'moment'

import { getAccountDomain } from '../../account/selectors'
import { getBlogDomain, getBlogUi } from '../selectors'
import {
  deleteBlogCommentApi,
  postBlogCommentApi,
  putBlogCommentApi,
} from '../../../api/blog-comment-api'
import {
  changeBlogDomain,
  changeBlogUi,
  createBlogCommentError,
  createBlogCommentSuccess,
  deleteBlogCommentError,
  deleteBlogCommentSuccess,
  initialBlogOtherDataState,
  updateBlogCommentError,
  updateBlogCommentSuccess,
} from '../actions'

export function* createBlogCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { comment } = payload
  const response = yield call(postBlogCommentApi, {
    blogId: blogDomain.id,
    userId: accountDomain.id,
    comment,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      yield put(
        changeBlogDomain({
          ...blogDomain,
          blogComments: [
            {
              id: data.id,
              comment: data.comment,
              userId: data.user.id,
              userNickname: data.user.nickname,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt,
              blogCommentComments: data.blogCommentComments,
            },
            ...blogDomain.blogComments,
          ],
        })
      )
      yield put(
        changeBlogUi({
          ...blogUi,
          blogComments: [
            {
              id: data.id,
              comment: data.comment,
              userId: data.user.id,
              userNickname: data.user.nickname,
              userFilePath: data.user.filePath,
              createdAt: moment(data.createdAt).format('YYYY/MM/DD hh:mm a'),
              blogCommentComments: data.blogCommentComments,
            },
            ...blogUi.blogComments,
          ],
        })
      )
      yield put(createBlogCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(createBlogCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(createBlogCommentError(response.data.data))
  }
}

export function* updateBlogCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { comment, blogCommentId } = payload
  const response = yield call(putBlogCommentApi, {
    blogCommentId,
    comment,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      yield put(
        changeBlogDomain({
          ...blogDomain,
          blogComments: R.map(v => {
            if (v.id === blogCommentId) {
              return {
                id: data.id,
                comment: data.comment,
                userId: data.user.id,
                userNickname: data.user.nickname,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                blogCommentComments: v.blogCommentComments,
              }
            } else {
              return {
                id: v.id,
                comment: v.comment,
                userId: v.userId,
                userNickname: v.userNickname,
                createdAt: v.createdAt,
                updatedAt: v.updatedAt,
                blogCommentComments: v.blogCommentComments,
              }
            }
          }, blogDomain.blogComments),
        })
      )

      yield put(
        changeBlogUi({
          ...blogUi,
          blogComments: R.map(v => {
            if (v.id === blogCommentId) {
              return {
                id: data.id,
                comment: data.comment,
                userId: data.user.id,
                userNickname: data.user.nickname,
                userFilePath: data.user.filePath,
                createdAt: moment(data.createdAt).format('YYYY/MM/DD hh:mm a'),
                blogCommentComments: v.blogCommentComments,
              }
            } else {
              return {
                id: v.id,
                comment: v.comment,
                userId: v.userId,
                userNickname: v.userNickname,
                userFilePath: v.userFilePath,
                createdAt: moment(v.createdAt).format('YYYY/MM/DD hh:mm a'),
                blogCommentComments: v.blogCommentComments,
              }
            }
          }, blogUi.blogComments),
        })
      )
      yield put(updateBlogCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(updateBlogCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(updateBlogCommentError(response.data.data))
  }
}

export function* deleteBlogCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { commentId } = payload
  const response = yield call(deleteBlogCommentApi, {
    blogCommentId: commentId,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(
        changeBlogDomain({
          ...blogDomain,
          blogComments: R.filter(
            v => v.id !== commentId,
            blogDomain.blogComments
          ),
        })
      )
      yield put(
        changeBlogUi({
          ...blogUi,
          blogComments: R.filter(v => v.id !== commentId, blogUi.blogComments),
        })
      )
      yield put(deleteBlogCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(deleteBlogCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(deleteBlogCommentError(response.data.data))
  }
}
