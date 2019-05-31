import React from 'react'
import { Button, Input, Typography } from 'antd'

import { MainLayout } from '../../components/layouts'
import { MyBlogTable } from '../../components'

import './styles.scss'

const MyBlogPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="my-blog-page-wrapper">
        <Typography.Title level={2}>내가 작성한 글</Typography.Title>
        <br />
        <br />
        <div>
          <Input
            className="my-blog-page-search-input"
            placeholder="제목을 검색해주세요."
            allowClear
            onChange={(e: any) => console.log('Line: 18', e)}
          />
          <Button type="default" icon="search" htmlType="button">
            검색
          </Button>
          <Button
            className="my-blog-page-create-btn"
            type="primary"
            icon="edit"
            htmlType="button"
          >
            글 작성
          </Button>
          <MyBlogTable />
        </div>
      </div>
    </MainLayout>
  )
}

export default MyBlogPage
