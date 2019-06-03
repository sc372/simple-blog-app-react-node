import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { UPDATE_USER } from './constants'
import {
  initialUpdateUserState,
  updateUserError,
  updateUserSuccess,
} from './actions'
import { getUpdateUserFormUi } from './selectors'
import { putUpdateUserApi } from '../../api/user-api'

function* updateUserSaga() {
  const updateUserFormUi = yield select(getUpdateUserFormUi())
  const response = yield call(putUpdateUserApi, updateUserFormUi)

  try {
    const { statusCode } = response.data
    yield delay(1000)

    if (statusCode < 400) {
      yield put(updateUserSuccess())
      yield put(initialUpdateUserState())
    } else {
      yield put(updateUserError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(updateUserError(response.data.data))
  }
}

export function* updateUserSagas() {
  yield all([takeLatest(UPDATE_USER, updateUserSaga)])
}
