import { handleActions } from 'redux-actions'
import { IBlogsState } from './state'
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

export const initialState: IBlogsState = {
  blogsUi: [],
  blogsDomain: [],
  blogsPageNum: 0,
  blogsTotalCount: 0,
  blogsSearchText: '',
  selectBlogsIsSuccess: false,
  selectBlogsIsLoading: false,
  selectBlogsErrorMessage: '',
}

export default handleActions<IBlogsState>(
  {
    [SELECT_BLOGS]: (
      state,
      action: ReduxActions.Action<ISelectBlogsPayload>
    ) => ({ ...state, selectBlogsIsLoading: true, ...action.payload }),
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
    [SELECT_BLOGS_SUCCESS]: (
      state,
      action: ReduxActions.Action<ISelectBlogsSuccessPayload>
    ) => ({ ...state, selectBlogsIsLoading: false, ...action.payload }),
    [SELECT_BLOGS_ERROR]: (
      state,
      action: ReduxActions.Action<ISelectBlogsErrorPayload>
    ) => ({ ...state, selectBlogsIsLoading: false, ...action.payload }),
    [INITIAL_BLOGS_STATE]: (state, action: ReduxActions.Action<IBlogsState>) =>
      action.payload,
  },
  initialState
)
