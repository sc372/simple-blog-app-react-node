import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { UPDATE_USER } from './constants'
import {
  initialUpdateUserState,
  updateUserError,
  updateUserSuccess,
} from './actions'
import { getUpdateUserFormUi } from './selectors'
import { putUpdateUserApi } from '../../api/user-api'
import {
  changeAccountDomainSuccess,
  changeAccountUiSuccess,
} from '../account/actions'

function* updateUserSaga() {
  const updateUserFormUi = yield select(getUpdateUserFormUi())
  const response = yield call(putUpdateUserApi, updateUserFormUi)

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
      localStorage.clear()
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
