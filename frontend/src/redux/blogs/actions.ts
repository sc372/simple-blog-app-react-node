import { createAction } from 'redux-actions'
import {
  SELECT_BLOGS,
  CHANGE_BLOGS_UI,
  CHANGE_BLOGS_DOMAIN,
  BLOGS_SUCCESS,
  BLOGS_ERROR,
  CHANGE_BLOGS_TOTAL_COUNT,
  CHANGE_BLOGS_SEARCH_TEXT,
  INITIAL_BLOGS_STATE,
} from './constants'
import {
  ISelectBlogsPayload,
  IChangeBlogsUiPayload,
  IChangeBlogsDomainPayload,
  IChangeBlogsTotalCountPayload,
  IChangeBlogsSearchTextPayload,
  IBlogsSuccessPayload,
  IBlogsErrorPayload,
} from './payloads'
import { IBlogsUi, IBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const selectBlogs = createAction<ISelectBlogsPayload, number, string>(
  SELECT_BLOGS,
  (blogsPageNum, blogsSearchText) => ({
    blogsIsLoading: true,
    blogsPageNum,
    blogsSearchText,
  })
)

export const blogsSuccess = createAction<IBlogsSuccessPayload>(
  BLOGS_SUCCESS,
  () => ({ blogsIsSuccess: true })
)

export const blogsError = createAction<IBlogsErrorPayload, string>(
  BLOGS_ERROR,
  blogsErrorMessage => ({
    blogsErrorMessage,
    blogsIsSuccess: false,
  })
)
export const changeBlogsUi = createAction<IChangeBlogsUiPayload, IBlogsUi[]>(
  CHANGE_BLOGS_UI,
  blogsUi => ({ blogsUi })
)

export const changeBlogsDomain = createAction<
  IChangeBlogsDomainPayload,
  IBlogsDomain[]
>(CHANGE_BLOGS_DOMAIN, blogsDomain => ({ blogsDomain }))

export const changeBlogsTotalCount = createAction<
  IChangeBlogsTotalCountPayload,
  number
>(CHANGE_BLOGS_TOTAL_COUNT, blogsTotalCount => ({ blogsTotalCount }))

export const changeBlogsSearchText = createAction<
  IChangeBlogsSearchTextPayload,
  string
>(CHANGE_BLOGS_SEARCH_TEXT, blogsSearchText => ({ blogsSearchText }))

export const initialBlogsState = createAction(
  INITIAL_BLOGS_STATE,
  () => initialState
)
