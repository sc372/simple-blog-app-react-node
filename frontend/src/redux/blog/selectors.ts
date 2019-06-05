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

export const getSelectBlogIsSuccess = () =>
  createSelector(
    blogState(),
    ({ selectBlogIsSuccess }) => selectBlogIsSuccess
  )

export const getSelectBlogIsLoading = () =>
  createSelector(
    blogState(),
    ({ selectBlogIsLoading }) => selectBlogIsLoading
  )

export const getSelectBlogErrorMessage = () =>
  createSelector(
    blogState(),
    ({ selectBlogErrorMessage }) => selectBlogErrorMessage
  )

// blog-comment
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

// blog-comment-comment
export const getCreateBlogCommentCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentCommentIsSuccess }) => createBlogCommentCommentIsSuccess
  )

export const getCreateBlogCommentCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentCommentIsLoading }) => createBlogCommentCommentIsLoading
  )

export const getCreateBlogCommentCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ createBlogCommentCommentErrorMessage }) =>
      createBlogCommentCommentErrorMessage
  )

export const getUpdateBlogCommentCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentCommentIsSuccess }) => updateBlogCommentCommentIsSuccess
  )

export const getUpdateBlogCommentCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentCommentIsLoading }) => updateBlogCommentCommentIsLoading
  )

export const getUpdateBlogCommentCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ updateBlogCommentCommentErrorMessage }) =>
      updateBlogCommentCommentErrorMessage
  )

export const getDeleteBlogCommentCommentIsSuccess = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentCommentIsSuccess }) => deleteBlogCommentCommentIsSuccess
  )

export const getDeleteBlogCommentCommentIsLoading = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentCommentIsLoading }) => deleteBlogCommentCommentIsLoading
  )

export const getDeleteBlogCommentCommentErrorMessage = () =>
  createSelector(
    blogState(),
    ({ deleteBlogCommentCommentErrorMessage }) =>
      deleteBlogCommentCommentErrorMessage
  )
