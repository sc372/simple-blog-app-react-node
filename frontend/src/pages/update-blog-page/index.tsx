import React from 'react'
import { Button, Input, Typography } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { MainLayout } from '../../components/layouts'
import { CustomEditor, CustomImageCrop } from '../../components'
import { IDispatchable } from '../../models'

import './styles.scss'

interface IUpdateBlogPageProps extends IDispatchable {}

const UpdateBlogPage: React.FC<IUpdateBlogPageProps> = () => {
  return (
    <MainLayout>
      <div className="update-blog-page-wrapper">
        <Typography.Title level={2}>블로그 수정</Typography.Title>
        <br />
        <br />
        <Typography.Title level={4}>제목</Typography.Title>
        <Input
          className="update-blog-page-title-input"
          placeholder="제목을 입력해주세요."
          allowClear
          onChange={e => console.log('Line: 17', e)}
          onPressEnter={() => console.log('Line: 18', 'skldhsfkj')}
        />
        <br />
        <br />
        <Typography.Title level={4}>내용</Typography.Title>
        {/*
        // @ts-ignore */}
        <CustomEditor />
        <br />
        <br />
        <Typography.Title level={4}>이미지</Typography.Title>
        {/*
        // @ts-ignore */}
        <CustomImageCrop />
        <Button className="update-blog-page-submit" type="primary">
          수정 완료
        </Button>
      </div>
    </MainLayout>
  )
}

const withConnect = connect()

export default compose<IUpdateBlogPageProps, IUpdateBlogPageProps>(withConnect)(
  UpdateBlogPage
)
