import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { CREATE_USER } from './constants'
import { createUserSuccess, createUserError } from './actions'
import { getSignUpFormUi } from './selectors'
import { postSignUpApi } from '../../api/user-api'

function* createUserSaga() {
  const signUpFormUi = yield select(getSignUpFormUi())
  const response = yield call(postSignUpApi, signUpFormUi)

  try {
    const { statusCode } = response.data
    yield delay(1000)

    if (statusCode < 400) {
      yield put(createUserSuccess())
    } else {
      yield put(createUserError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(createUserError(response.data.data))
  }
}

export function* createUserSagas() {
  yield all([takeLatest(CREATE_USER, createUserSaga)])
}
