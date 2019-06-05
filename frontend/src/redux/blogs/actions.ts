import { createAction } from 'redux-actions'
import {
  SELECT_BLOGS,
  CHANGE_BLOGS_UI,
  CHANGE_BLOGS_DOMAIN,
  SELECT_BLOGS_SUCCESS,
  SELECT_BLOGS_ERROR,
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
  ISelectBlogsSuccessPayload,
  ISelectBlogsErrorPayload,
} from './payloads'
import { IBlogsUi, IBlogsDomain } from '../../models'
import { initialState } from './reducer'

export const selectBlogs = createAction<ISelectBlogsPayload, number, string>(
  SELECT_BLOGS,
  (blogsPageNum, blogsSearchText) => ({
    selectBlogsIsLoading: true,
    blogsPageNum,
    blogsSearchText,
  })
)

export const selectBlogsSuccess = createAction<ISelectBlogsSuccessPayload>(
  SELECT_BLOGS_SUCCESS,
  () => ({ selectBlogsIsSuccess: true })
)

export const selectBlogsError = createAction<ISelectBlogsErrorPayload, string>(
  SELECT_BLOGS_ERROR,
  selectBlogsErrorMessage => ({
    selectBlogsErrorMessage,
    selectBlogsIsSuccess: false,
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
