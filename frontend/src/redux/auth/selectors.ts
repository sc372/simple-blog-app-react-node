import { IStoreState } from '../store-state'
import { createSelector } from 'reselect'

export const authFormUiState = () => (state: IStoreState) => state.authFormUi

export const selectSignInFormUi = () =>
  createSelector(
    authFormUiState(),
    ({ signInFormUi }) => signInFormUi
  )

export const selectSignUpFormUi = () =>
  createSelector(
    authFormUiState(),
    ({ signUpFormUi }) => signUpFormUi
  )
