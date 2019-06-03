import { createSelector } from 'reselect'
import { IStoreState } from '../store-state'

export const accountState = () => (state: IStoreState) => state.account

export const getSignInFormUi = () =>
  createSelector(
    accountState(),
    ({ signInFormUi }) => signInFormUi
  )

export const getAccountUi = () =>
  createSelector(
    accountState(),
    ({ accountUi }) => accountUi
  )

export const getAccountDomain = () =>
  createSelector(
    accountState(),
    ({ accountDomain }) => accountDomain
  )

export const getAccountIsLoading = () =>
  createSelector(
    accountState(),
    ({ accountIsLoading }) => accountIsLoading
  )

export const getAccountIsSuccess = () =>
  createSelector(
    accountState(),
    ({ accountIsSuccess }) => accountIsSuccess
  )

export const getAccountErrorMessage = () =>
  createSelector(
    accountState(),
    ({ accountErrorMessage }) => accountErrorMessage
  )
