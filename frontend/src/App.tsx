import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { MainPage, MyPage, BlogPage, MyBlogPage, BlogFormPage } from './pages'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { IAccountUi, IDispatchable } from './models'
import { signInWithJwt } from './redux/account/actions'
import { createSelector } from 'reselect'
import { getAccountUi } from './redux/account/selectors'
import { notification } from 'antd'

interface IAppProps extends IDispatchable {
  readonly accountUi: IAccountUi
}

interface IPrivateRoute {
  readonly path: any
  readonly component: any
  readonly isLogin: boolean
}

// TODO: 비동기 통신으로 page guard 에 이슈가 있음
const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  isLogin,
}) => (
  <Route
    render={props => (isLogin ? <Component {...props} /> : <Redirect to="/" />)}
  />
)

const App: React.FC<IAppProps> = ({ accountUi, dispatch }) => {
  useEffect(() => {
    localStorage.getItem('jwt_token') && dispatch(signInWithJwt())
  }, []) // eslint-disable-line

  notification.config({
    placement: 'bottomRight',
    duration: 3,
  })

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Simple Blog</title>
        <meta name="description" content="Simple Blog" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Helmet>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/blogs/:blogId" component={BlogPage} />
        <PrivateRoute
          path="/my/blog"
          component={MyBlogPage}
          isLogin={accountUi.isLogin}
        />
        <PrivateRoute
          path="/my"
          component={MyPage}
          isLogin={accountUi.isLogin}
        />
        <PrivateRoute
          path="/create-blog"
          component={BlogFormPage}
          isLogin={accountUi.isLogin}
        />
        <PrivateRoute
          path="/update-blog/:blogId"
          component={BlogFormPage}
          isLogin={accountUi.isLogin}
        />
        {/*<Route path="*" componet={NoMatch}/>*/}
      </Switch>
    </>
  )
}

const mapStateToProps = createSelector(
  getAccountUi(),
  accountUi => ({
    accountUi,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IAppProps, IAppProps>(withConnect)(App)
