import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Avatar, Typography } from 'antd'

import { MainLayout } from '../../components/layouts'
import { BlogComment } from '../../components'
import { IDispatchable } from '../../models'

import './styles.scss'

interface IBlogPageProps extends IDispatchable {}

const BlogPage: React.FC<IBlogPageProps> = () => {
  return (
    <MainLayout>
      <div className="blog-page-wrapper">
        <Typography.Title level={2}>모래 뿐일 것이다.</Typography.Title>
        <div>
          <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
          <span className="blog-page-author">상자</span>
          <div className="blog-page-date">2019/06/01</div>
        </div>
        <img
          className="blog-page-image"
          src="https://picsum.photos/1300/700"
          alt=""
        />
        <div className="blog-page-content-wrapper">
          <p>
            Ant Design which is specially created for internal desktop
            applications, is committed to improving the experience of users and
            product designers.User interface designers and user experience
            designers, collectively, are considered as product designers, and
            the boundaries of product managers, interaction designers, visual
            designers, front-end developers and develop engineers are blurred.
            Taking advantage of unitary specifications, Ant Design makes design
            and prototype more simple and accessible for all project members,
            which comprehensively promotes experience and development efficiency
            of background applications and products.Ant Design which is
            specially created for internal desktop applications, is committed to
            improving the experience of users and product designers.User
            interface designers and user experience designers, collectively, are
            considered as product designers, and the boundaries of product
            managers, interaction designers, visual designers, front-end
            developers and develop engineers are blurred. Taking advantage of
            unitary specifications, Ant Design makes design and prototype more
            simple and accessible for all project members, which comprehensively
            promotes experience and development efficiency of background
            applications and products.
          </p>
        </div>
        // @ts-ignore
        <BlogComment />
      </div>
    </MainLayout>
  )
}

const withConnect = connect()

export default compose<IBlogPageProps, IBlogPageProps>(withConnect)(BlogPage)
