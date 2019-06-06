import React, { useEffect, Suspense, useState } from 'react'
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
import { notification, Progress } from 'antd'

interface IAppProps extends IDispatchable {}

const LazyPrivateRoute = React.lazy(() => {
  return new Promise(resolve => setTimeout(resolve, 1300)).then(() =>
    import('./PrivateGuard')
  )
})

const App: React.FC<IAppProps> = ({ dispatch }) => {
  useEffect(() => {
    localStorage.getItem('jwt_token') && dispatch(signInWithJwt())
    increase()
  }, []) // eslint-disable-line

  notification.config({
    placement: 'bottomRight',
    duration: 3,
  })

  const [loadingTimer, setLoadingTimer] = useState(0)

  const increase = () => {
    const percent = loadingTimer + 3
    if (percent >= 100) {
      window.clearTimeout(tm)
      return
    }
    setLoadingTimer(percent)
  }

  const tm = window.setTimeout(increase, 10)

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
      {/*
       // @ts-ignore */}
      <Suspense
        maxDuration={200}
        fallback={
          <Progress
            strokeColor={{
              from: '#ffffff',
              to: '#292961',
            }}
            percent={loadingTimer}
            status="active"
          />
        }
      >
        <Switch>
          {/*
           // @ts-ignore */}
          <Route exact path="/" component={MainPage} />
          <Route path="/blogs/:blogId" component={BlogPage} />
          {/*
           // @ts-ignore */}
          <LazyPrivateRoute path="/my/blog" component={MyBlogPage} />
          {/*
           // @ts-ignore */}
          <LazyPrivateRoute path="/my" component={MyPage} />
          {/*
           // @ts-ignore */}
          <LazyPrivateRoute path="/create-blog" component={BlogFormPage} />
          {/*
           // @ts-ignore */}
          <LazyPrivateRoute
            path="/update-blog/:blogId"
            component={BlogFormPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  )
}

const withConnect = connect()

export default compose<IAppProps, IAppProps>(withConnect)(App)
