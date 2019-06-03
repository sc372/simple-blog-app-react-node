import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const authState = () => (state: IStoreState) => state.auth

export const getSignUpFormUi = () =>
  createSelector(
    authState(),
    ({ signUpFormUi }) => signUpFormUi
  )

export const getSignUpIsSuccess = () =>
  createSelector(
    authState(),
    ({ signUpIsSuccess }) => signUpIsSuccess
  )

export const getAuthIsLoading = () =>
  createSelector(
    authState(),
    ({ authIsLoading }) => authIsLoading
  )

export const getAuthErrorMessage = () =>
  createSelector(
    authState(),
    ({ authErrorMessage }) => authErrorMessage
  )
