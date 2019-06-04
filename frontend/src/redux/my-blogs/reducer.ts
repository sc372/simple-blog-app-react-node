import { handleActions } from 'redux-actions'
import { IMyBlogsState } from './state'
import {
  SELECT_MY_BLOGS,
  CHANGE_MY_BLOGS_UI,
  CHANGE_MY_BLOGS_DOMAIN,
  CHANGE_MY_BLOGS_TOTAL_COUNT,
  CHANGE_MY_BLOGS_SEARCH_TEXT,
  MY_BLOGS_SUCCESS,
  MY_BLOGS_ERROR,
  INITIAL_MY_BLOGS_STATE,
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

export const initialState: IMyBlogsState = {
  myBlogsUi: [],
  myBlogsDomain: [],
  myBlogsPageNum: 0,
  myBlogsTotalCount: 0,
  myBlogsSearchText: '',
  myBlogsIsSuccess: false,
  myBlogsIsLoading: false,
  myBlogsErrorMessage: '',
}

export default handleActions<IMyBlogsState>(
  {
    [SELECT_MY_BLOGS]: (
      state,
      action: ReduxActions.Action<ISelectMyBlogsPayload>
    ) => ({ ...state, myBlogsIsLoading: true, ...action.payload }),
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
    [MY_BLOGS_SUCCESS]: (
      state,
      action: ReduxActions.Action<IMyBlogsSuccessPayload>
    ) => ({ ...state, myBlogsIsLoading: false, ...action.payload }),
    [MY_BLOGS_ERROR]: (
      state,
      action: ReduxActions.Action<IMyBlogsErrorPayload>
    ) => ({ ...state, myBlogsIsLoading: false, ...action.payload }),
    [INITIAL_MY_BLOGS_STATE]: (
      state,
      action: ReduxActions.Action<IMyBlogsState>
    ) => action.payload,
  },
  initialState
)
