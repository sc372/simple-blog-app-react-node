import React, { useEffect } from 'react'
import { Button, Form, Input, notification, Typography } from 'antd'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as R from 'ramda'

import { MainLayout } from '../../components/layouts'
import { CustomImageCrop } from '../../components'
import { IAccountDomain, IDispatchable, IUpdateUserFormUi } from '../../models'

import './styles.scss'
import { createSelector } from 'reselect'
import { getAccountDomain } from '../../redux/account/selectors'
import {
  changeUpdateUserFormUi,
  initialUpdateUserState,
  updateUser,
  updateUserError,
} from '../../redux/update-user/actions'
import {
  getUpdateUserErrorMessage,
  getUpdateUserFormUi,
  getUpdateUserIsSuccess,
} from '../../redux/update-user/selectors'

interface IMyPageProps extends IDispatchable {
  readonly accountDomain: IAccountDomain
  readonly updateUserFormUi: IUpdateUserFormUi
  readonly updateUserIsSuccess: boolean
  readonly updateUserErrorMessage: string
  readonly history: any
  readonly form: any
}

const _MyPage: React.FC<IMyPageProps> = ({
  accountDomain,
  updateUserFormUi,
  updateUserIsSuccess,
  updateUserErrorMessage,
  history,
  form,
  dispatch,
}) => {
  useEffect(() => {
    dispatchChangeUpdateUserFormUi({
      id: accountDomain.id,
      jwtToken: accountDomain.jwtToken,
      nickname: accountDomain.nickname,
      email: accountDomain.email,
      fileName: accountDomain.fileName,
      filePath: accountDomain.filePath,
    })
    form.setFieldsValue({
      nickname: accountDomain.nickname,
      email: accountDomain.email,
    })
  }, []) // eslint-disable-line

  useEffect(() => {
    notification.config({
      placement: 'bottomRight',
    })
    if (updateUserIsSuccess) {
      history.push('/')
      notification['error']({
        message: '회원 정보가 수정 되었습니다.',
      })
      dispatchInitialUpdateUserState()
    }
  }, [updateUserIsSuccess]) // eslint-disable-line

  useEffect(() => {
    notification.config({
      placement: 'bottomRight',
    })
    if (!R.isEmpty(updateUserErrorMessage) && !updateUserIsSuccess) {
      notification['error']({
        message: updateUserErrorMessage,
      })
      dispatchUpdateUserError('')
    }
  }, [updateUserErrorMessage]) // eslint-disable-line

  // form-submit
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields((err: any, values: any) => {
      if (err) {
        console.log('유효하지 않은 값: ', values)
        return
      }
      dispatchUpdateUser()
    })
  }

  // dispatcher
  const dispatchChangeUpdateUserFormUi = (data: any) =>
    dispatch(
      changeUpdateUserFormUi({
        ...updateUserFormUi,
        ...data,
      })
    )
  const dispatchUpdateUser = () => dispatch(updateUser())
  const dispatchUpdateUserError = (message: string) =>
    dispatch(updateUserError(message))
  const dispatchInitialUpdateUserState = () =>
    dispatch(initialUpdateUserState())

  return (
    <MainLayout>
      <div className="my-page-wrapper">
        <Typography.Title level={2}>나의 정보</Typography.Title>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Typography.Title level={4}>닉네임</Typography.Title>
          <Form.Item>
            {form.getFieldDecorator('nickname', {
              rules: [{ required: true, message: '닉네임을 입력해주세요.' }],
            })(
              <Input
                className="my-page-input"
                placeholder="닉네임을 입력해주세요."
                allowClear
                onChange={e => {
                  dispatchChangeUpdateUserFormUi({ nickname: e.target.value })
                  form.setFieldsValue({ nickname: e.target.value })
                }}
              />
            )}
          </Form.Item>
          <Typography.Title level={4}>이메일</Typography.Title>
          <Form.Item>
            {form.getFieldDecorator('email', {
              rules: [
                { type: 'email', message: '이메일 형식에 맞지 않습니다.' },
                { required: true, message: '이메일을 입력해주세요.' },
              ],
            })(
              <Input
                className="my-page-input"
                placeholder="이메일을 입력해주세요."
                allowClear
                onChange={e => {
                  dispatchChangeUpdateUserFormUi({ email: e.target.value })
                  form.setFieldsValue({ email: e.target.value })
                }}
              />
            )}
          </Form.Item>
          <Typography.Title level={4}>프로필 사진</Typography.Title>
          {/*
          // @ts-ignore */}
          <CustomImageCrop
            accountDomain={accountDomain}
            state={updateUserFormUi}
            dispatchSetState={dispatchChangeUpdateUserFormUi}
          />
          <div className="my-page-submit-wrapper">
            <span className="my-page-submit">
              <Button type="primary" htmlType="submit">
                수정하기
              </Button>
            </span>
          </div>
        </Form>
      </div>
    </MainLayout>
  )
}

const MyPage = Form.create({
  name: 'my_page_form',
})(_MyPage)

const mapStateToProps = createSelector(
  getAccountDomain(),
  getUpdateUserFormUi(),
  getUpdateUserIsSuccess(),
  getUpdateUserErrorMessage(),
  (
    accountDomain,
    updateUserFormUi,
    updateUserIsSuccess,
    updateUserErrorMessage
  ) => ({
    accountDomain,
    updateUserFormUi,
    updateUserIsSuccess,
    updateUserErrorMessage,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IMyPageProps, IMyPageProps>(withConnect)(
  // @ts-ignore
  compose<IMyPageProps, IMyPageProps>(withRouter)(MyPage)
)
