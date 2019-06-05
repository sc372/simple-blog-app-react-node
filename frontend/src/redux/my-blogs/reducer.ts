import { handleActions } from 'redux-actions'
import { IMyBlogsState } from './state'
import {
  SELECT_MY_BLOGS,
  CHANGE_MY_BLOGS_UI,
  CHANGE_MY_BLOGS_DOMAIN,
  CHANGE_MY_BLOGS_TOTAL_COUNT,
  CHANGE_MY_BLOGS_SEARCH_TEXT,
  SELECT_MY_BLOGS_SUCCESS,
  SELECT_MY_BLOGS_ERROR,
  INITIAL_MY_BLOGS_STATE,
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

export const initialState: IMyBlogsState = {
  myBlogsUi: [],
  myBlogsDomain: [],
  myBlogsPageNum: 0,
  myBlogsTotalCount: 0,
  myBlogsSearchText: '',
  selectMyBlogsIsSuccess: false,
  selectMyBlogsIsLoading: false,
  selectMyBlogsErrorMessage: '',
}

export default handleActions<IMyBlogsState>(
  {
    [SELECT_MY_BLOGS]: (
      state,
      action: ReduxActions.Action<ISelectMyBlogsPayload>
    ) => ({ ...state, selectMyBlogsIsLoading: true, ...action.payload }),
    [CHANGE_MY_BLOGS_UI]: (
      state,
      action: ReduxActions.Action<IChangeMyBlogsUiPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_MY_BLOGS_DOMAIN]: (
      state,
      action: ReduxActions.Action<IChangeMyBlogsDomainPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_MY_BLOGS_TOTAL_COUNT]: (
      state,
      action: ReduxActions.Action<IChangeMyBlogsTotalCountPayload>
    ) => ({ ...state, ...action.payload }),
    [CHANGE_MY_BLOGS_SEARCH_TEXT]: (
      state,
      action: ReduxActions.Action<IChangeMyBlogsSearchTextPayload>
    ) => ({ ...state, ...action.payload }),
    [SELECT_MY_BLOGS_SUCCESS]: (
      state,
      action: ReduxActions.Action<ISelectMyBlogsSuccessPayload>
    ) => ({ ...state, selectMyBlogsIsLoading: false, ...action.payload }),
    [SELECT_MY_BLOGS_ERROR]: (
      state,
      action: ReduxActions.Action<ISelectMyBlogsErrorPayload>
    ) => ({ ...state, selectMyBlogsIsLoading: false, ...action.payload }),
    [INITIAL_MY_BLOGS_STATE]: (
      state,
      action: ReduxActions.Action<IMyBlogsState>
    ) => action.payload,
  },
  initialState
)
