import { createAction } from 'redux-actions'
import {
  SELECT_MY_BLOGS,
  CHANGE_MY_BLOGS_UI,
  CHANGE_MY_BLOGS_DOMAIN,
  SELECT_MY_BLOGS_SUCCESS,
  SELECT_MY_BLOGS_ERROR,
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
  ISelectMyBlogsSuccessPayload,
  ISelectMyBlogsErrorPayload,
} from './payloads'
import { IMyBlogsUi, IMyBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const selectMyBlogs = createAction<
  ISelectMyBlogsPayload,
  number,
  string
>(SELECT_MY_BLOGS, (myBlogsPageNum, myBlogsSearchText) => ({
  selectMyBlogsIsLoading: true,
  myBlogsPageNum,
  myBlogsSearchText,
}))

export const myBlogsSuccess = createAction<ISelectMyBlogsSuccessPayload>(
  SELECT_MY_BLOGS_SUCCESS,
  () => ({ selectMyBlogsIsSuccess: true })
)

export const myBlogsError = createAction<ISelectMyBlogsErrorPayload, string>(
  SELECT_MY_BLOGS_ERROR,
  selectMyBlogsErrorMessage => ({
    selectMyBlogsErrorMessage,
    selectMyBlogsIsSuccess: false,
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
