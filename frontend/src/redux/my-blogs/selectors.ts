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

export const getMyBlogsIsSuccess = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsIsSuccess }) => myBlogsIsSuccess
  )

export const getMyBlogsIsLoading = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsIsLoading }) => myBlogsIsLoading
  )

export const getMyBlogsErrorMessage = () =>
  createSelector(
    myBlogsState(),
    ({ myBlogsErrorMessage }) => myBlogsErrorMessage
  )
