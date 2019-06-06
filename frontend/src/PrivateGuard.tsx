import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'
import { getAccountUi } from './redux/account/selectors'
import { IAccountUi } from './models/account'

interface IPrivateRoute {
  readonly path: any
  readonly component: any
  readonly accountUi: IAccountUi
}


// TODO: 비동기 통신으로 page guard 에 이슈가 있음
const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  accountUi,
}) => {
  return (
    <Route
      render={props =>
        accountUi.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )
}

const mapStateToProps = createSelector(
  getAccountUi(),
  accountUi => ({
    accountUi,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IPrivateRoute, IPrivateRoute>(withConnect)(PrivateRoute)
