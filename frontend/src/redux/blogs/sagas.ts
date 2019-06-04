import { all, call, put, takeLatest, select, delay } from 'redux-saga/effects'
import { SELECT_BLOGS } from './constants'
import {
  blogsSuccess,
  blogsError,
  changeBlogsUi,
  changeBlogsDomain,
  changeBlogsTotalCount,
} from './actions'
import { getBlogsApi } from '../../api/blog-api'
import * as R from 'ramda'
import moment from 'moment'
import { getBlogsDomain, getBlogsUi } from './selectors'

function* selectBlogsSaga({ payload }: any) {
  const { blogsPageNum, blogsSearchText } = payload
  const response = yield call(getBlogsApi, {
    pageNum: blogsPageNum,
    searchText: blogsSearchText,
  })
  const beforeBlogsUi = yield select(getBlogsUi())
  const beforeBlogsDomain = yield select(getBlogsDomain())

  try {
    const { statusCode, data } = response.data
    yield delay(500)

    if (statusCode < 400) {
      const blogsUi = R.map(
        v => ({
          id: v.id,
          title: v.title,
          nickname: v.user.nickname,
          contents: v.contents,
          blogFilePath: v.filePath,
          userFilePath: v.user.filePath,
          blogComment: R.map(
            vv => ({
              id: vv.id,
              comment: vv.comment,
              userId: vv.user.id,
              userNickname: vv.user.nickname,
              userFilePath: vv.user.filePath,
              createdAt: moment(vv.createdAt).format('YYYY/MM/DD'),
            }),
            v.blogComment
          ),
          createdAt: moment(v.createdAt).format('YYYY/MM/DD'),
        }),
        data[0]
      )

      yield put(changeBlogsTotalCount(data[1]))
      yield put(
        changeBlogsDomain(
          blogsPageNum === 0
            ? data[0]
            : R.uniq([...beforeBlogsDomain, ...data[0]])
        )
      )
      yield put(
        changeBlogsUi(
          blogsPageNum === 0 ? blogsUi : R.uniq([...beforeBlogsUi, ...blogsUi])
        )
      )
      yield put(blogsSuccess())
    } else {
      yield put(blogsError(response.data.data))
    }
  } catch (error) {
    console.log(error)
    yield put(blogsError(response.data.data))
  }
}

export function* blogsSagas() {
  yield all([takeLatest(SELECT_BLOGS, selectBlogsSaga)])
}
