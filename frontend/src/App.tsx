import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  MainPage,
  MyPage,
  BlogPage,
  MyBlogPage,
  BlogFormPage,
  NotFoundPage,
} from './pages'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { IDispatchable } from './models'
import { signInWithJwt } from './redux/account/actions'
import { notification } from 'antd'
import PrivateRoute from './PrivateGuard'

interface IAppProps extends IDispatchable {}

const App: React.FC<IAppProps> = ({ dispatch }) => {
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
        // @ts-ignore
        <PrivateRoute path="/my/blog" component={MyBlogPage} />
        // @ts-ignore
        <PrivateRoute path="/my" component={MyPage} />
        // @ts-ignore
        <PrivateRoute path="/create-blog" component={BlogFormPage} />
        // @ts-ignore
        <PrivateRoute path="/update-blog/:blogId" component={BlogFormPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  )
}

const withConnect = connect()

export default compose<IAppProps, IAppProps>(withConnect)(App)
