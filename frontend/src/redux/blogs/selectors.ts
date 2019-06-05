import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const blogsState = () => (state: IStoreState) => state.blogs

export const getBlogsUi = () =>
  createSelector(
    blogsState(),
    ({ blogsUi }) => blogsUi
  )

export const getBlogsDomain = () =>
  createSelector(
    blogsState(),
    ({ blogsDomain }) => blogsDomain
  )

export const getBlogsPageNum = () =>
  createSelector(
    blogsState(),
    ({ blogsPageNum }) => blogsPageNum
  )

export const getBlogsTotalCount = () =>
  createSelector(
    blogsState(),
    ({ blogsTotalCount }) => blogsTotalCount
  )

export const getBlogsSearchText = () =>
  createSelector(
    blogsState(),
    ({ blogsSearchText }) => blogsSearchText
  )

export const getSelectBlogsIsSuccess = () =>
  createSelector(
    blogsState(),
    ({ selectBlogsIsSuccess }) => selectBlogsIsSuccess
  )

export const getSelectBlogsIsLoading = () =>
  createSelector(
    blogsState(),
    ({ selectBlogsIsLoading }) => selectBlogsIsLoading
  )

export const getSelectBlogsErrorMessage = () =>
  createSelector(
    blogsState(),
    ({ selectBlogsErrorMessage }) => selectBlogsErrorMessage
  )
