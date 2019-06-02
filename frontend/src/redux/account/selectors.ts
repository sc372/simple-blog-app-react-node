import { createSelector } from 'reselect'
import { IStoreState } from '../store-state'

export const accountState = () => (state: IStoreState) => state.account

export const selectAccountUi = () =>
  createSelector(
    accountState(),
    ({ accountUi }) => accountUi
  )

export const selectAccountDomain = () =>
  createSelector(
    accountState(),
    ({ accountDomain }) => accountDomain
  )

export const selectAccountIsLoading = () =>
  createSelector(
    accountState(),
    ({ isLoading }) => isLoading
  )

export const selectAccountErrorMessage = () =>
  createSelector(
    accountState(),
    ({ errorMessage }) => errorMessage
  )
