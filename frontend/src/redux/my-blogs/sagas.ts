import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { SELECT_MY_BLOGS } from './constants'
import {
  myBlogsSuccess,
  myBlogsError,
  changeMyBlogsUi,
  changeMyBlogsDomain,
  changeMyBlogsTotalCount,
} from './actions'
import { getAccountDomain } from '../account/selectors'
import { getMyBlogsApi } from '../../api/blog-api'
import * as R from 'ramda'
import moment from 'moment'

function* selectMyBlogsSaga({ payload }: any) {
  const accountDomain = yield select(getAccountDomain())
  const { myBlogsPageNum, myBlogsSearchText } = payload
  const response = yield call(getMyBlogsApi, {
    accountId: accountDomain.id,
    jwtToken: accountDomain.jwtToken,
    pageNum: myBlogsPageNum,
    searchText: myBlogsSearchText,
  })

  try {
    const { statusCode, data } = response.data

    if (statusCode < 400) {
      const myBlogsUi = R.map(
        v => ({
          id: v.id,
          nickname: accountDomain.nickname,
          title: v.title,
          createdAt: moment(v.createdAt).format('YYYY/MM/DD'),
        }),
        data[0]
      )

      yield put(changeMyBlogsTotalCount(data[1]))
      yield put(changeMyBlogsDomain(data[0]))
      yield put(changeMyBlogsUi(myBlogsUi))
      yield put(myBlogsSuccess())
    } else {
      yield put(myBlogsError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(myBlogsError(response.data.data))
  }
}

export function* myBlogsSagas() {
  yield all([takeLatest(SELECT_MY_BLOGS, selectMyBlogsSaga)])
}
