import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const blogFormState = () => (state: IStoreState) => state.blogForm

export const getBlogFormUi = () =>
  createSelector(
    blogFormState(),
    ({ blogFormUi }) => blogFormUi
  )

export const getCreateBlogIsSuccess = () =>
  createSelector(
    blogFormState(),
    ({ createBlogIsSuccess }) => createBlogIsSuccess
  )

export const getCreateBlogIsLoading = () =>
  createSelector(
    blogFormState(),
    ({ createBlogIsLoading }) => createBlogIsLoading
  )

export const getCreateBlogErrorMessage = () =>
  createSelector(
    blogFormState(),
    ({ createBlogErrorMessage }) => createBlogErrorMessage
  )

export const getDeleteBlogIsSuccess = () =>
  createSelector(
    blogFormState(),
    ({ deleteBlogIsSuccess }) => deleteBlogIsSuccess
  )

export const getDeleteBlogIsLoading = () =>
  createSelector(
    blogFormState(),
    ({ deleteBlogIsLoading }) => deleteBlogIsLoading
  )

export const getDeleteBlogErrorMessage = () =>
  createSelector(
    blogFormState(),
    ({ deleteBlogErrorMessage }) => deleteBlogErrorMessage
  )

export const getUpdateBlogIsSuccess = () =>
  createSelector(
    blogFormState(),
    ({ updateBlogIsSuccess }) => updateBlogIsSuccess
  )

export const getUpdateBlogIsLoading = () =>
  createSelector(
    blogFormState(),
    ({ updateBlogIsLoading }) => updateBlogIsLoading
  )

export const getUpdateBlogErrorMessage = () =>
  createSelector(
    blogFormState(),
    ({ updateBlogErrorMessage }) => updateBlogErrorMessage
  )
