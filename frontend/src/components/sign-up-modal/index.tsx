import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { Form, Icon, Input, Modal, notification } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'

import {
  getCreateUserErrorMessage,
  getCreateUserIsLoading,
  getCreateUserIsSuccess,
  getSignUpFormUi,
} from '../../redux/create-user/selectors'
import { IDispatchable, ISignInFormUi } from '../../models'

import './styles.scss'
import {
  changeSignUpFormUi,
  createUser,
  createUserError,
  initialAuthState,
} from '../../redux/create-user/actions'
import * as R from 'ramda'

interface ISignUpModalProps extends IDispatchable {
  readonly setIsSignUpModal: Dispatch<SetStateAction<boolean>>
  readonly isSignUpModal: boolean
  readonly signUpFormUi: ISignInFormUi
  readonly createUserIsSuccess: boolean
  readonly isAuthLoading: boolean
  readonly createUserErrorMessage: string
  readonly form: any
}

const SignUpCreateForm = Form.create({
  name: 'form_in_modal_with_sign_up',
})(
  class extends React.Component {
    render() {
      const {
        // @ts-ignore
        setIsSignUpModal,
        // @ts-ignore
        isSignUpModal,
        // @ts-ignore
        dispatchChangeSignUpFormUi,
        // @ts-ignore
        dispatchCreateUser,
        // @ts-ignore
        dispatchInitialAuthState,
        // @ts-ignore
        isAuthLoading,
        // @ts-ignore
        form,
      } = this.props

      const handleSubmit = (e: any) => {
        e.preventDefault()
        form.validateFields((err: any, values: any) => {
          if (err) {
            console.log('유효하지 않은 값: ', values)
            return
          }
          dispatchCreateUser()
        })
      }

      return (
        <Modal
          title="회원가입"
          centered
          visible={isSignUpModal}
          okText="가입"
          cancelText="취소"
          onOk={handleSubmit}
          onCancel={() => {
            dispatchInitialAuthState()
            setIsSignUpModal(false)
          }}
        >
          {isAuthLoading ? (
            <Icon className="sign-up-loading-icon" type="loading" />
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
                      dispatchChangeSignUpFormUi({ email: e.target.value })
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
                      dispatchChangeSignUpFormUi({ password: e.target.value })
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('rePassword', {
                  rules: [
                    {
                      validator: (
                        rule: any,
                        value: any,
                        callback: (arg0: string) => void
                      ) => {
                        if (value && value !== form.getFieldValue('password')) {
                          callback('비밀번호가 일치하지 않습니다.')
                        } else {
                          // @ts-ignore
                          callback()
                        }
                      },
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="비밀번호 재입력"
                    onChange={e =>
                      dispatchChangeSignUpFormUi({ rePassword: e.target.value })
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('nickname', {
                  rules: [
                    { required: true, message: '닉네임을 입력해주세요.' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" />}
                    placeholder="닉네임"
                    onChange={e =>
                      dispatchChangeSignUpFormUi({ nickname: e.target.value })
                    }
                  />
                )}
              </Form.Item>
            </Form>
          )}
        </Modal>
      )
    }
  }
)

const SignUpModal: React.FC<ISignUpModalProps> = ({
  setIsSignUpModal,
  isSignUpModal,
  signUpFormUi,
  createUserIsSuccess,
  createUserErrorMessage,
  isAuthLoading,
  dispatch,
}) => {
  useEffect(() => {
    if (createUserIsSuccess) {
      setIsSignUpModal(false)
    }
  }, [createUserIsSuccess]) // eslint-disable-line

  useEffect(() => {
    if (!R.isEmpty(createUserErrorMessage)) {
      notification['error']({
        message: createUserErrorMessage,
      })
      dispatch(createUserError(''))
    }
  }, [createUserErrorMessage]) // eslint-disable-line

  const signUpFormRef: any = useRef(null)

  const dispatchChangeSignUpFormUi = (data: any) =>
    dispatch(
      changeSignUpFormUi({
        ...signUpFormUi,
        ...data,
      })
    )

  const dispatchCreateUser = () => dispatch(createUser())
  const dispatchInitialAuthState = () => dispatch(initialAuthState())

  return (
    <div className="sign-in-modal-wrapper">
      {/*
        // @ts-ignore */}
      <SignUpCreateForm
        wrappedComponentRef={signUpFormRef}
        setIsSignUpModal={setIsSignUpModal}
        isSignUpModal={isSignUpModal}
        signUpFormUi={signUpFormUi}
        dispatchChangeSignUpFormUi={dispatchChangeSignUpFormUi}
        dispatchCreateUser={dispatchCreateUser}
        dispatchInitialAuthState={dispatchInitialAuthState}
        isAuthLoading={isAuthLoading}
      />
    </div>
  )
}

const mapStateToProps = createSelector(
  getSignUpFormUi(),
  getCreateUserIsSuccess(),
  getCreateUserIsLoading(),
  getCreateUserErrorMessage(),
  (
    signUpFormUi,
    createUserIsSuccess,
    isAuthLoading,
    createUserErrorMessage
  ) => ({
    signUpFormUi,
    createUserIsSuccess,
    isAuthLoading,
    createUserErrorMessage,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<ISignUpModalProps, ISignUpModalProps>(withConnect)(
  SignUpModal
)
