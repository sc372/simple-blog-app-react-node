import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const createUserState = () => (state: IStoreState) => state.createUser

export const getSignUpFormUi = () =>
  createSelector(
    createUserState(),
    ({ signUpFormUi }) => signUpFormUi
  )

export const getSignUpIsSuccess = () =>
  createSelector(
    createUserState(),
    ({ signUpIsSuccess }) => signUpIsSuccess
  )

export const getCreateUserIsLoading = () =>
  createSelector(
    createUserState(),
    ({ createUserIsLoading }) => createUserIsLoading
  )

export const getCreateUserErrorMessage = () =>
  createSelector(
    createUserState(),
    ({ createUserErrorMessage }) => createUserErrorMessage
  )
