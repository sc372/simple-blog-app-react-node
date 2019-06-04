import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import {
  SELECT_BLOG,
  CREATE_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT,
  DELETE_BLOG_COMMENT,
} from './constants'
import {
  blogSuccess,
  blogError,
  changeBlogUi,
  changeBlogDomain,
  createBlogCommentSuccess,
  initialBlogState,
  createBlogCommentError,
  updateBlogCommentSuccess,
  updateBlogCommentError,
  deleteBlogCommentError,
  deleteBlogCommentSuccess,
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
import { getBlogDomain } from './selectors'
import { IBlogsCommentUi } from '../../models/blogs'

function* selectBlogSaga({ payload }: any) {
  yield put(initialBlogState())
  const { blogId } = payload
  const response = yield call(getBlogApi, blogId)

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      const blogUi = {
        id: data.id,
        title: data.title,
        nickname: data.user.nickname,
        contents: data.contents,
        blogFilePath: data.filePath,
        userFilePath: data.user.filePath,
        blogComment: R.map(
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
          }),
          R.reverse(R.sortBy(v => v.createdAt, data.blogComment))
        ),
        createdAt: moment(data.createdAt).format('YYYY/MM/DD hh:mm a'),
      }

      yield put(changeBlogDomain(data))
      yield put(changeBlogUi(blogUi))
      yield put(blogSuccess())
    } else {
      yield put(blogError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(blogError(response.data.data))
  }
}

function* createBlogCommentSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const blogDomain = yield select(getBlogDomain())
  const { comment } = payload
  const response = yield call(postBlogCommentApi, {
    blogId: blogDomain.id,
    userId: accountDomain.id,
    comment,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(createBlogCommentSuccess())
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
  const { comment, blogCommentId } = payload
  const response = yield call(putBlogCommentApi, {
    blogCommentId,
    comment,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(updateBlogCommentSuccess())
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
  const { commentId } = payload
  const response = yield call(deleteBlogCommentApi, {
    blogCommentId: commentId,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(deleteBlogCommentSuccess())
    } else {
      yield put(deleteBlogCommentError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(deleteBlogCommentError(response.data.data))
  }
}

export function* blogSagas() {
  yield all([
    takeLatest(SELECT_BLOG, selectBlogSaga),
    takeLatest(CREATE_BLOG_COMMENT, createBlogCommentSaga),
    takeLatest(UPDATE_BLOG_COMMENT, updateBlogCommentSaga),
    takeLatest(DELETE_BLOG_COMMENT, deleteBlogCommentSaga),
  ])
}
