import React from 'react'
import { Button, Col, Input, Row, Typography } from 'antd'

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
          <Row>
            <Col span={12}>
              <Input
                className="my-blog-page-search-input"
                placeholder="제목을 검색해주세요."
                allowClear
                onChange={(e: any) => console.log('Line: 18', e)}
              />
            </Col>
            <Col span={10}>
              <Button
                className="my-blog-page-search-btn"
                type="default"
                icon="search"
                htmlType="button"
              >
                검색
              </Button>
            </Col>
            <Col span={2}>
              <Button
                className="my-blog-page-create-btn"
                type="primary"
                icon="edit"
                htmlType="button"
              >
                글 작성
              </Button>
            </Col>
          </Row>
          <MyBlogTable />
        </div>
      </div>
    </MainLayout>
  )
}

export default MyBlogPage
