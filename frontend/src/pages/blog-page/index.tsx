import React from 'react'
import { MainLayout } from '../../components/layouts'
import { Avatar, Typography } from 'antd'
import { BlogComment } from '../../components'

import './styles.scss'

const BlogPage: React.FC = () => {
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
          src="https://picsum.photos/1300/500"
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
        <BlogComment />
      </div>
    </MainLayout>
  )
}

export default BlogPage
