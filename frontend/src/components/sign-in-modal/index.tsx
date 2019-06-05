import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Checkbox, Form, Icon, Input, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'
import * as R from 'ramda'

import { getSignInFormUi } from '../../redux/account/selectors'
import { IDispatchable, ISignInFormUi } from '../../models'
import { changeSignInFormUi } from '../../redux/account/actions'
import {
  initialAccountState,
  signIn,
  selectAccountError,
} from '../../redux/account/actions'
import {
  getAccountErrorMessage,
  getAccountIsLoading,
  getAccountIsSuccess,
} from '../../redux/account/selectors'

import './styles.scss'

interface ISignInModalProps extends IDispatchable {
  readonly setIsSignInModal: Dispatch<SetStateAction<boolean>>
  readonly isSignInModal: boolean
  readonly signInFormUi: ISignInFormUi
  readonly accountIsSuccess: boolean
  readonly accountIsLoading: boolean
  readonly accountErrorMessage: string
  readonly form: any
}

const SignInCreateForm = Form.create({
  name: 'form_in_modal_with_sign_in',
})(
  class extends React.Component {
    render() {
      const {
        // @ts-ignore
        setIsSignInModal,
        // @ts-ignore
        isSignInModal,
        // @ts-ignore
        signInFormUi,
        // @ts-ignore
        accountIsLoading,
        // @ts-ignore
        dispatchChangeSignInFormUi,
        // @ts-ignore
        dispatchSelectAccount,
        // @ts-ignore
        dispatchInitialAccountState,
        // @ts-ignore
        form,
      } = this.props

      const handleSubmit = (e: any) => {
        e.preventDefault()
        form.validateFields((err: any, values: any) => {
          if (err) {
            console.log('유효하지 않은 값: ', values)
            return
          } else {
            dispatchSelectAccount()
          }
        })
      }

      return (
        <Modal
          title="로그인"
          centered
          visible={isSignInModal}
          okText="로그인"
          cancelText="취소"
          onOk={handleSubmit}
          onCancel={() => {
            dispatchInitialAccountState()
            setIsSignInModal(false)
          }}
        >
          {accountIsLoading ? (
            <Icon className="sign-in-loading-icon" type="loading" />
          ) : (
            <Form className="login-form-wrapper">
              <Form.Item>
                {form.getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: '이메일 형식에 맞지 않습니다.' },
                    { required: true, message: '이메일을 입력해주세요.' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="mail" />}
                    placeholder="이메일"
                    onChange={e =>
                      dispatchChangeSignInFormUi({ email: e.target.value })
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '비밀번호를 입력해주세요.' },
                    {
                      pattern: /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{6,12}$/,
                      message:
                        '비밀번호는 숫자, 문자, 특수문자 포함 6~12자리를 입력해주세요.',
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="비밀번호"
                    onChange={e =>
                      dispatchChangeSignInFormUi({ password: e.target.value })
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('isAutoLogin', {
                  valuePropName: 'checked',
                  initialValue: signInFormUi.isAutoLogin,
                })(
                  <Checkbox
                    onChange={() =>
                      dispatchChangeSignInFormUi({
                        isAutoLogin: !signInFormUi.isAutoLogin,
                      })
                    }
                  >
                    자동 로그인
                  </Checkbox>
                )}
              </Form.Item>
            </Form>
          )}
        </Modal>
      )
    }
  }
)

const SignInModal: React.FC<ISignInModalProps> = ({
  setIsSignInModal,
  isSignInModal,
  signInFormUi,
  accountIsLoading,
  accountIsSuccess,
  accountErrorMessage,
  dispatch,
}) => {
  useEffect(() => {
    if (accountIsSuccess) {
      setIsSignInModal(false)
    }
  }, [accountIsSuccess]) // eslint-disable-line

  useEffect(() => {
    if (!R.isEmpty(accountErrorMessage)) {
      notification['error']({
        message: accountErrorMessage,
      })
      dispatch(selectAccountError(''))
    }
  }, [accountErrorMessage]) // eslint-disable-line

  const signInFormRef: any = useRef(null)

  const dispatchChangeSignInFormUi = (data: any) =>
    dispatch(
      changeSignInFormUi({
        ...signInFormUi,
        ...data,
      })
    )

  const dispatchSelectAccount = () => dispatch(signIn())
  const dispatchInitialAccountState = () => dispatch(initialAccountState())

  return (
    <div className="sign-in-modal-wrapper">
      {/*
        // @ts-ignore */}
      <SignInCreateForm
        wrappedComponentRef={signInFormRef}
        setIsSignInModal={setIsSignInModal}
        isSignInModal={isSignInModal}
        signInFormUi={signInFormUi}
        accountIsLoading={accountIsLoading}
        dispatchChangeSignInFormUi={dispatchChangeSignInFormUi}
        dispatchSelectAccount={dispatchSelectAccount}
        dispatchInitialAccountState={dispatchInitialAccountState}
      />
    </div>
  )
}

const mapStateToProps = createSelector(
  getSignInFormUi(),
  getAccountIsLoading(),
  getAccountIsSuccess(),
  getAccountErrorMessage(),
  (signInFormUi, accountIsLoading, accountIsSuccess, accountErrorMessage) => ({
    signInFormUi,
    accountIsLoading,
    accountIsSuccess,
    accountErrorMessage,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<ISignInModalProps, ISignInModalProps>(withConnect)(
  SignInModal
)
