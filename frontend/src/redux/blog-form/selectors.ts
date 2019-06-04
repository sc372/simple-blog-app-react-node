import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const blogFormState = () => (state: IStoreState) => state.blogForm

export const getBlogFormUi = () =>
  createSelector(
    blogFormState(),
    ({ blogFormUi }) => blogFormUi
  )

export const getBlogFormIsSuccess = () =>
  createSelector(
    blogFormState(),
    ({ blogFormIsSuccess }) => blogFormIsSuccess
  )

export const getBlogFormIsLoading = () =>
  createSelector(
    blogFormState(),
    ({ blogFormIsLoading }) => blogFormIsLoading
  )

export const getBlogFormErrorMessage = () =>
  createSelector(
    blogFormState(),
    ({ blogFormErrorMessage }) => blogFormErrorMessage
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
