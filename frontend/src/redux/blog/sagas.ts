import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  SELECT_BLOG,
  CREATE_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT,
  DELETE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_COMMENT,
  UPDATE_BLOG_COMMENT_COMMENT,
  DELETE_BLOG_COMMENT_COMMENT,
} from './constants'
import {
  changeBlogUi,
  changeBlogDomain,
  selectBlogSuccess,
  selectBlogError,
  createBlogCommentSuccess,
  createBlogCommentError,
  updateBlogCommentSuccess,
  updateBlogCommentError,
  deleteBlogCommentError,
  deleteBlogCommentSuccess,
  deleteBlogCommentCommentSuccess,
  createBlogCommentCommentError,
  deleteBlogCommentCommentError,
  updateBlogCommentCommentSuccess,
  updateBlogCommentCommentError,
  createBlogCommentCommentSuccess,
  initialBlogState,
  initialBlogOtherDataState,
} from './actions'
import { getBlogApi } from '../../api/blog-api'
import {
  deleteBlogCommentApi,
  postBlogCommentApi,
  putBlogCommentApi,
} from '../../api/blog-comment-api'
import * as R from 'ramda'
import moment from 'moment'
import { getAccountDomain } from '../account/selectors'
import { getBlogDomain, getBlogUi } from './selectors'
import {
  IBlogsCommentCommentDomain,
  IBlogsCommentCommentUi,
  IBlogsCommentDomain,
  IBlogsCommentUi,
  IBlogsDomain,
  IBlogsUi,
} from '../../models/blogs'
import {
  deleteBlogCommentCommentApi,
  postBlogCommentCommentApi,
  putBlogCommentCommentApi,
} from '../../api/blog-comment-comment-api'

function* selectBlogSaga({ payload }: any) {
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

function* createBlogCommentSaga({ payload }: any) {
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

function* updateBlogCommentSaga({ payload }: any) {
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

function* deleteBlogCommentSaga({ payload }: any) {
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

function* createBlogCommentCommentSaga({ payload }: any) {
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

function* updateBlogCommentCommentSaga({ payload }: any) {
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

function* deleteBlogCommentCommentSaga({ payload }: any) {
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

export function* blogSagas() {
  yield all([
    takeLatest(SELECT_BLOG, selectBlogSaga),
    takeLatest(CREATE_BLOG_COMMENT, createBlogCommentSaga),
    takeLatest(UPDATE_BLOG_COMMENT, updateBlogCommentSaga),
    takeLatest(DELETE_BLOG_COMMENT, deleteBlogCommentSaga),
    takeLatest(CREATE_BLOG_COMMENT_COMMENT, createBlogCommentCommentSaga),
    takeLatest(UPDATE_BLOG_COMMENT_COMMENT, updateBlogCommentCommentSaga),
    takeLatest(DELETE_BLOG_COMMENT_COMMENT, deleteBlogCommentCommentSaga),
  ])
}
