import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const blogState = () => (state: IStoreState) => state.blog

export const getBlogUi = () =>
  createSelector(
    blogState(),
    ({ blogUi }) => blogUi
  )

export const getBlogDomain = () =>
  createSelector(
    blogState(),
    ({ blogDomain }) => blogDomain
  )

export const getBlogIsSuccess = () =>
  createSelector(
    blogState(),
    ({ blogIsSuccess }) => blogIsSuccess
  )

export const getBlogIsLoading = () =>
  createSelector(
    blogState(),
    ({ blogIsLoading }) => blogIsLoading
  )

export const getBlogErrorMessage = () =>
  createSelector(
    blogState(),
    ({ blogErrorMessage }) => blogErrorMessage
  )

export const getCreateBlogCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentIsSuccess }) => createBlogCommentIsSuccess
  )

export const getCreateBlogCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentIsLoading }) => createBlogCommentIsLoading
  )

export const getCreateBlogCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentErrorMessage }) => createBlogCommentErrorMessage
  )

export const getUpdateBlogCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentIsSuccess }) => updateBlogCommentIsSuccess
  )

export const getUpdateBlogCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentIsLoading }) => updateBlogCommentIsLoading
  )

export const getUpdateBlogCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentErrorMessage }) => updateBlogCommentErrorMessage
  )

export const getDeleteBlogCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentIsSuccess }) => deleteBlogCommentIsSuccess
  )

export const getDeleteBlogCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentIsLoading }) => deleteBlogCommentIsLoading
  )

export const getDeleteBlogCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentErrorMessage }) => deleteBlogCommentErrorMessage
  )
