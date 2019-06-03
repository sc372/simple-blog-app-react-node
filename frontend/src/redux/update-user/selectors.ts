import { createSelector } from 'reselect'
import { IStoreState } from '../store-state'

export const updateUserState = () => (state: IStoreState) => state.updateUser

export const getUpdateUserFormUi = () =>
  createSelector(
    updateUserState(),
    ({ updateUserFormUi }) => updateUserFormUi
  )

export const getUpdateUserIsLoading = () =>
  createSelector(
    updateUserState(),
    ({ updateUserIsLoading }) => updateUserIsLoading
  )

export const getUpdateUserIsSuccess = () =>
  createSelector(
    updateUserState(),
    ({ updateUserIsSuccess }) => updateUserIsSuccess
  )

export const getUpdateUserErrorMessage = () =>
  createSelector(
    updateUserState(),
    ({ updateUserErrorMessage }) => updateUserErrorMessage
  )
