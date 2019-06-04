import { createAction } from 'redux-actions'
import {
  SELECT_MY_BLOGS,
  CHANGE_MY_BLOGS_UI,
  CHANGE_MY_BLOGS_DOMAIN,
  MY_BLOGS_SUCCESS,
  MY_BLOGS_ERROR,
  INITIAL_MY_BLOGS_STATE,
  CHANGE_MY_BLOGS_TOTAL_COUNT,
  CHANGE_MY_BLOGS_SEARCH_TEXT,
} from './constants'
import {
  ISelectMyBlogsPayload,
  IChangeMyBlogsUiPayload,
  IChangeMyBlogsDomainPayload,
  IChangeMyBlogsTotalCountPayload,
  IChangeMyBlogsSearchTextPayload,
  IMyBlogsSuccessPayload,
  IMyBlogsErrorPayload,
} from './payloads'
import { IMyBlogsUi, IMyBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const selectMyBlogs = createAction<
  ISelectMyBlogsPayload,
  number,
  string
>(SELECT_MY_BLOGS, (myBlogsPageNum, myBlogsSearchText) => ({
  myBlogsIsLoading: true,
  myBlogsPageNum,
  myBlogsSearchText,
}))

export const myBlogsSuccess = createAction<IMyBlogsSuccessPayload>(
  MY_BLOGS_SUCCESS,
  () => ({ myBlogsIsSuccess: true })
)

export const myBlogsError = createAction<IMyBlogsErrorPayload, string>(
  MY_BLOGS_ERROR,
  myBlogsErrorMessage => ({
    myBlogsErrorMessage,
    myBlogsIsSuccess: false,
  })
)
export const changeMyBlogsUi = createAction<
  IChangeMyBlogsUiPayload,
  IMyBlogsUi[]
>(CHANGE_MY_BLOGS_UI, myBlogsUi => ({ myBlogsUi }))

export const changeMyBlogsDomain = createAction<
  IChangeMyBlogsDomainPayload,
  IMyBlogsDomain[]
>(CHANGE_MY_BLOGS_DOMAIN, myBlogsDomain => ({ myBlogsDomain }))

export const changeMyBlogsTotalCount = createAction<
  IChangeMyBlogsTotalCountPayload,
  number
>(CHANGE_MY_BLOGS_TOTAL_COUNT, myBlogsTotalCount => ({ myBlogsTotalCount }))

export const changeMyBlogsSearchText = createAction<
  IChangeMyBlogsSearchTextPayload,
  string
>(CHANGE_MY_BLOGS_SEARCH_TEXT, myBlogsSearchText => ({ myBlogsSearchText }))

export const initialMyBlogsState = createAction(
  INITIAL_MY_BLOGS_STATE,
  () => initialState
)
