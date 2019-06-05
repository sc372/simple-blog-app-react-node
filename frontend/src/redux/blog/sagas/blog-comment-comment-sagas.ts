import { call, put, select } from 'redux-saga/effects'
import * as R from 'ramda'
import moment from 'moment'

import { getAccountDomain } from '../../account/selectors'
import { getBlogDomain, getBlogUi } from '../selectors'
import {
  deleteBlogCommentCommentApi,
  postBlogCommentCommentApi,
  putBlogCommentCommentApi,
} from '../../../api/blog-comment-comment-api'
import {
  changeBlogDomain,
  changeBlogUi,
  createBlogCommentCommentError,
  createBlogCommentCommentSuccess,
  deleteBlogCommentCommentError,
  deleteBlogCommentCommentSuccess,
  initialBlogOtherDataState,
  updateBlogCommentCommentError,
  updateBlogCommentCommentSuccess,
} from '../actions'

export function* createBlogCommentCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { comment, blogCommentId } = payload
  const response = yield call(postBlogCommentCommentApi, {
    blogId: blogDomain.id,
    userId: accountDomain.id,
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
                ...v,
                blogCommentComments: [
                  {
                    id: data.id,
                    comment: data.comment,
                    userId: data.user.id,
                    userNickname: data.user.nickname,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                  },
                  ...v.blogCommentComments,
                ],
              }
            } else {
              return v
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
                ...v,
                blogCommentComments: [
                  {
                    id: data.id,
                    comment: data.comment,
                    userId: data.user.id,
                    userNickname: data.user.nickname,
                    userFilePath: data.user.filePath,
                    createdAt: moment(data.createdAt).format(
                      'YYYY/MM/DD hh:mm a'
                    ),
                  },
                  ...v.blogCommentComments,
                ],
              }
            } else {
              return v
            }
          }, blogUi.blogComments),
        })
      )
      yield put(createBlogCommentCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(createBlogCommentCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(createBlogCommentCommentError(response.data.data))
  }
}

export function* updateBlogCommentCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { comment, blogCommentCommentId } = payload
  const response = yield call(putBlogCommentCommentApi, {
    blogCommentCommentId,
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
            if (v.id === data.blogComment.id) {
              return {
                ...v,
                blogCommentComments: R.map(vv => {
                  if (vv.id === data.id) {
                    return {
                      id: data.id,
                      comment: data.comment,
                      userId: data.user.id,
                      userNickname: data.user.nickname,
                      createdAt: data.createdAt,
                      updatedAt: data.updatedAt,
                    }
                  } else {
                    return vv
                  }
                }, v.blogCommentComments),
              }
            } else {
              return v
            }
          }, blogDomain.blogComments),
        })
      )
      yield put(
        changeBlogUi({
          ...blogUi,
          blogComments: R.map(v => {
            if (v.id === data.blogComment.id) {
              return {
                ...v,
                blogCommentComments: R.map(vv => {
                  if (vv.id === data.id) {
                    return {
                      id: data.id,
                      comment: data.comment,
                      userId: data.user.id,
                      userNickname: data.user.nickname,
                      userFilePath: data.user.filePath,
                      createdAt: moment(data.createdAt).format(
                        'YYYY/MM/DD hh:mm a'
                      ),
                    }
                  } else {
                    return vv
                  }
                }, v.blogCommentComments),
              }
            } else {
              return v
            }
          }, blogUi.blogComments),
        })
      )
      yield put(updateBlogCommentCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(updateBlogCommentCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(updateBlogCommentCommentError(response.data.data))
  }
}

export function* deleteBlogCommentCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const blogUi = yield select(getBlogUi())
  const { blogCommentId, blogCommentCommentId } = payload
  const response = yield call(deleteBlogCommentCommentApi, {
    blogCommentCommentId,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(
        changeBlogDomain({
          ...blogDomain,
          blogComments: R.map(v => {
            if (v.id === blogCommentId) {
              return {
                ...v,
                blogCommentComments: R.filter(
                  vv => vv.id !== blogCommentCommentId,
                  v.blogCommentComments
                ),
              }
            } else {
              return v
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
                ...v,
                blogCommentComments: R.filter(
                  vv => vv.id !== blogCommentCommentId,
                  v.blogCommentComments
                ),
              }
            } else {
              return v
            }
          }, blogUi.blogComments),
        })
      )

      yield put(deleteBlogCommentCommentSuccess())
      yield put(initialBlogOtherDataState())
    } else {
      yield put(deleteBlogCommentCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(deleteBlogCommentCommentError(response.data.data))
  }
}
