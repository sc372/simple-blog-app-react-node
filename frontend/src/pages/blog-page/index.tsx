import React, { useEffect } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Avatar, Typography } from 'antd'
import { createSelector } from 'reselect'
import * as R from 'ramda'

import { MainLayout } from '../../components/layouts'
import { BlogComment } from '../../components'
import { IBlogsUi, IDispatchable } from '../../models'

import './styles.scss'
import { withRouter } from 'react-router'
import { getBlogUi } from '../../redux/blog/selectors'
import { selectBlog } from '../../redux/blog/actions'

interface IBlogPageProps extends IDispatchable {
  readonly blogUi: IBlogsUi
  readonly location: any
}

const BlogPage: React.FC<IBlogPageProps> = ({ blogUi, location, dispatch }) => {
  useEffect(() => {
    // @ts-ignore
    dispatch(selectBlog(R.split('/', location.pathname)[2]))
  }, []) // eslint-disable-line

  return (
    <MainLayout>
      <div className="blog-page-wrapper">
        <Typography.Title level={2}>{blogUi.title}</Typography.Title>
        <div>
          <Avatar src={blogUi.userFilePath} />
          <span className="blog-page-author">{blogUi.nickname}</span>
          <div className="blog-page-date">{blogUi.createdAt}</div>
        </div>
        <img className="blog-page-image" src={blogUi.blogFilePath} alt="" />
        <div
          className="blog-page-content-wrapper"
          dangerouslySetInnerHTML={{ __html: blogUi.contents }}
        />
        {/*
            // @ts-ignore */}
        <BlogComment />
      </div>
    </MainLayout>
  )
}

const mapStateToProps = createSelector(
  getBlogUi(),
  blogUi => ({
    blogUi,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IBlogPageProps, IBlogPageProps>(withConnect)(
  // @ts-ignore
  compose<IBlogPageProps, IBlogPageProps>(withRouter)(BlogPage)
)
