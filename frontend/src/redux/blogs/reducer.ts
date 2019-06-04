import { handleActions } from 'redux-actions'
import { IBlogsState } from './state'
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

export const initialState: IBlogsState = {
  blogsUi: [],
  blogsDomain: [],
  blogsPageNum: 0,
  blogsTotalCount: 0,
  blogsSearchText: '',
  blogsIsSuccess: false,
  blogsIsLoading: false,
  blogsErrorMessage: '',
}

export default handleActions<IBlogsState>(
  {
    [SELECT_BLOGS]: (
      state,
      action: ReduxActions.Action<ISelectBlogsPayload>
    ) => ({ ...state, blogsIsLoading: true, ...action.payload }),
    [CHANGE_BLOGS_UI]: (
      state,
      action: ReduxActions.Action<IChangeBlogsUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_BLOGS_DOMAIN]: (
      state,
      action: ReduxActions.Action<IChangeBlogsDomainPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_BLOGS_TOTAL_COUNT]: (
      state,
      action: ReduxActions.Action<IChangeBlogsTotalCountPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_BLOGS_SEARCH_TEXT]: (
      state,
      action: ReduxActions.Action<IChangeBlogsSearchTextPayload>
    ) => ({ ...state, ...action.payload }),
    [BLOGS_SUCCESS]: (
      state,
      action: ReduxActions.Action<IBlogsSuccessPayload>
    ) => ({ ...state, blogsIsLoading: false, ...action.payload }),
    [BLOGS_ERROR]: (
      state,
      action: ReduxActions.Action<IBlogsErrorPayload>
    ) => ({ ...state, blogsIsLoading: false, ...action.payload }),
    [INITIAL_BLOGS_STATE]: (state, action: ReduxActions.Action<IBlogsState>) =>
      action.payload,
  },
  initialState
)
