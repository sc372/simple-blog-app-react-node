import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { SELECT_ACCOUNT, SELECT_ACCOUNT_WITH_TOKEN } from './constants'
import {
  selectAccountUiSuccess,
  selectAccountDomainSuccess,
  selectAccountError,
} from './actions'
import { selectSignInFormUi } from '../auth/selectors'
import { postSignInApi, postSignInWithJwtApi } from '../../api/auth-api'
import * as R from 'ramda'

function* selectAccountSaga() {
  const signInFormUi = yield select(selectSignInFormUi())
  const response = yield call(postSignInApi, signInFormUi)

  console.log('Line: 16', response)
  console.log('Line: 16', response)

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      yield put(
        selectAccountUiSuccess({
          nickname: data.nickname,
          isLogin: true,
          filePath: data.filePath,
        })
      )
      yield put(
        selectAccountDomainSuccess({
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          createdAt: data.createdAt,
          jwtToken: data.token,
        })
      )
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
    token: localStorage.getItem('jwt_token'),
  })

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      yield put(
        selectAccountUiSuccess({
          nickname: data.nickname,
          isLogin: true,
          filePath: data.filePath,
        })
      )
      yield put(
        selectAccountDomainSuccess({
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          createdAt: data.createdAt,
          jwtToken: data.token,
        })
      )
    } else {
      yield put(selectAccountError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(selectAccountError(response.data.data))
  }
}

export function* accountSaga() {
  yield all([
    takeLatest(SELECT_ACCOUNT, selectAccountSaga),
    takeLatest(SELECT_ACCOUNT_WITH_TOKEN, selectAccountWithTokenSaga),
  ])
}
