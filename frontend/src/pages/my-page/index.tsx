import React from 'react'
import { Button, Input, Typography } from 'antd'

import { MainLayout } from '../../components/layouts'
import { CustomImageCrop } from '../../components'

import './styles.scss'

const MyPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="my-page-wrapper">
        <Typography.Title level={2}>나의 정보</Typography.Title>
        <br />
        <br />
        <Typography.Title level={4}>닉네임</Typography.Title>
        <Input
          className="my-page-input"
          placeholder="닉네임을 입력해주세요."
          allowClear
          onChange={e => console.log('Line: 18', e)}
        />
        <br />
        <br />
        <Typography.Title level={4}>이메일</Typography.Title>
        <Input
          className="my-page-input"
          placeholder="이메일을 입력해주세요."
          allowClear
          onChange={e => console.log('Line: 18', e)}
        />
        <br />
        <br />
        <Typography.Title level={4}>프로필 사진</Typography.Title>
        <CustomImageCrop />
        <div className="my-page-submit-wrapper">
          <span className="my-page-submit">
            <Button type="primary">수정하기</Button>
          </span>
          <span className="my-page-drop-out">
            <Button type="danger">탈퇴하기</Button>
          </span>
        </div>
      </div>
    </MainLayout>
  )
}

export default MyPage
