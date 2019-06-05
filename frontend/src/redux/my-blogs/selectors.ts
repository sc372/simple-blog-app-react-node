import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const myBlogsState = () => (state: IStoreState) => state.myBlogs

export const getMyBlogsUi = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsUi }) => myBlogsUi
  )

export const getMyBlogsDomain = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsDomain }) => myBlogsDomain
  )

export const getMyBlogsPageNum = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsPageNum }) => myBlogsPageNum
  )

export const getMyBlogsTotalCount = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsTotalCount }) => myBlogsTotalCount
  )

export const getMyBlogsSearchText = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsSearchText }) => myBlogsSearchText
  )

export const getSelectMyBlogsIsSuccess = () =>
  createSelector(
    myBlogsState(),
    ({ selectMyBlogsIsSuccess }) => selectMyBlogsIsSuccess
  )

export const getSelectMyBlogsIsLoading = () =>
  createSelector(
    myBlogsState(),
    ({ selectMyBlogsIsLoading }) => selectMyBlogsIsLoading
  )

export const getSelectMyBlogsErrorMessage = () =>
  createSelector(
    myBlogsState(),
    ({ selectMyBlogsErrorMessage }) => selectMyBlogsErrorMessage
  )
