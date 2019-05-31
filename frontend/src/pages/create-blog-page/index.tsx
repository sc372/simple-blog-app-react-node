import React from 'react'
import { Button, Input, Typography } from 'antd'

import { MainLayout } from '../../components/layouts'
import { CustomEditor, CustomImageCrop } from '../../components'

import './styles.scss'

const CreateBlogPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="create-blog-page-wrapper">
        <Typography.Title level={2}>블로그 작성</Typography.Title>
        <br />
        <br />
        <Typography.Title level={4}>제목</Typography.Title>
        <Input
          className="create-blog-page-title-input"
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
        <Button className="create-blog-page-submit" type="primary">
          작성 완료
        </Button>
      </div>
    </MainLayout>
  )
}

export default CreateBlogPage
