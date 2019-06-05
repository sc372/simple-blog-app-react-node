import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { CREATE_BLOG, DELETE_BLOG, UPDATE_BLOG } from './constants'
import {
  createBlogSuccess,
  createBlogError,
  deleteBlogError,
  deleteBlogSuccess,
  updateBlogError,
  updateBlogSuccess,
} from './actions'
import { getBlogFormUi } from './selectors'
import { postBlogApi, putBlogApi, deleteBlogApi } from '../../api/blog-api'
import { getAccountDomain } from '../account/selectors'

function* createBlogSaga() {
  const blogFormUi = yield select(getBlogFormUi())
  const response = yield call(postBlogApi, blogFormUi)

  try {
    const { statusCode } = response.data
    yield delay(1000)

    if (statusCode < 400) {
      yield put(createBlogSuccess())
    } else {
      yield put(createBlogError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(createBlogError(response.data.data))
  }
}

function* updateBlogSaga() {
  const blogFormUi = yield select(getBlogFormUi())
  const response = yield call(putBlogApi, blogFormUi)

  try {
    const { statusCode } = response.data
    yield delay(1000)

    if (statusCode < 400) {
      yield put(updateBlogSuccess())
    } else {
      yield put(updateBlogError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(updateBlogError(response.data.data))
  }
}

function* deleteBlogSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const { blogId } = payload
  const response = yield call(deleteBlogApi, {
    blogId,
    jwtToken: accountDomain.jwtToken,
  })

  try {
    const { statusCode } = response.data

    if (statusCode < 400) {
      yield put(deleteBlogSuccess())
    } else {
      yield put(deleteBlogError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(deleteBlogError(response.data.data))
  }
}

export function* blogFormSagas() {
  yield all([
    takeLatest(CREATE_BLOG, createBlogSaga),
    takeLatest(UPDATE_BLOG, updateBlogSaga),
    takeLatest(DELETE_BLOG, deleteBlogSaga),
  ])
}
