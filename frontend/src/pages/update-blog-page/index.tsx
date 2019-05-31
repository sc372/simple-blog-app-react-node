import React from 'react'
import { Button, Input, Typography } from 'antd'

import { MainLayout } from '../../components/layouts'
import { CustomEditor, CustomImageCrop } from '../../components'

import './styles.scss'

const UpdateBlogPage: React.FC = () => {
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
        <CustomEditor />
        <br />
        <br />
        <Typography.Title level={4}>이미지</Typography.Title>
        <CustomImageCrop />
        <Button className="update-blog-page-submit" type="primary">
          수정 완료
        </Button>
      </div>
    </MainLayout>
  )
}

export default UpdateBlogPage
