import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { SIGN_IN, SIGN_IN_WITH_TOKEN } from './constants'
import {
  changeAccountUiSuccess,
  changeAccountDomainSuccess,
  selectAccountError,
  selectAccountSuccess,
} from './actions'
import { getSignInFormUi } from './selectors'
import { postSignInApi, postSignInWithJwtApi } from '../../api/auth-api'
import * as R from 'ramda'

function* selectAccountSaga() {
  const signInFormUi = yield select(getSignInFormUi())
  const response = yield call(postSignInApi, signInFormUi)

  try {
    const { statusCode, data } = response.data
    yield delay(1000)

    if (statusCode < 400) {
      yield put(
        changeAccountUiSuccess({
          nickname: data.nickname,
          isLogin: true,
          filePath: data.filePath,
        })
      )
      yield put(
        changeAccountDomainSuccess({
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          createdAt: data.createdAt,
          filePath: data.filePath,
          fileName: data.fileName,
          jwtToken: data.token,
        })
      )
      yield put(selectAccountSuccess())
      signInFormUi.isAutoLogin && localStorage.setItem('jwt_token', data.token)
    } else {
      yield put(selectAccountError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(selectAccountError(response.data.data))
  }
}

function* selectAccountWithTokenSaga() {
  if (R.isEmpty(localStorage.getItem('jwt_token'))) return

  const response = yield call(postSignInWithJwtApi, {
    jwtToken: localStorage.getItem('jwt_token'),
  })

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      yield put(
        changeAccountUiSuccess({
          nickname: data.nickname,
          isLogin: true,
          filePath: data.filePath,
        })
      )
      yield put(
        changeAccountDomainSuccess({
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          createdAt: data.createdAt,
          filePath: data.filePath,
          fileName: data.fileName,
          jwtToken: data.token,
        })
      )
      yield put(selectAccountSuccess())
    } else {
      yield put(selectAccountError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(selectAccountError(response.data.data))
  }
}

export function* accountSagas() {
  yield all([
    takeLatest(SIGN_IN, selectAccountSaga),
    takeLatest(SIGN_IN_WITH_TOKEN, selectAccountWithTokenSaga),
  ])
}
