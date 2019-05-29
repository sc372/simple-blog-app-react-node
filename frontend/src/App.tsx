import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  MainPage,
  MyPage,
  BlogPage,
  MyBlogPage,
  CreateBlogPage,
  UpdateBlogPage,
} from './pages'

const App: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={MainPage} />
      <Switch>
        <Route path="/my/blog" component={MyBlogPage} />
        <Route path="/my" component={MyPage} />
      </Switch>
      <Route path="/blogs/:blogId" component={BlogPage} />
      <Route path="/create-blog" component={CreateBlogPage} />
      <Route path="/update-blog/:blogId" component={UpdateBlogPage} />
    </>
  )
}

export default App
