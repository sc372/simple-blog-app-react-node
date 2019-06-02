import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Form, Icon, Input, Modal } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'

import { IDispatchable, ISignUpFormUi } from '../../models'
import { changeSignUpFormUi } from '../../redux/auth/actions'
import { selectSignUpFormUi } from '../../redux/auth/selectors'

import './styles.scss'

interface ISignUpModalProps extends IDispatchable {
  readonly setIsSignUpModal: Dispatch<SetStateAction<boolean>>
  readonly isSignUpModal: boolean
  readonly signUpFormUi: ISignUpFormUi
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
        signUpFormUi,
        // @ts-ignore
        dispatchSignUpFormUi,
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
            setIsSignUpModal(false)
            // dispatch(selectAccount())
          }
        })
      }

      return (
        <Modal
          title="회원가입"
          centered
          okText="회원가입"
          cancelText="취소"
          visible={isSignUpModal}
          onOk={handleSubmit}
          onCancel={() => setIsSignUpModal(false)}
        >
          <Form
            onSubmit={() => console.log('Line: 69', 'skjdhkfj')}
            className="login-form-wrapper"
          >
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
                  value={signUpFormUi.email}
                  onChange={e =>
                    dispatchSignUpFormUi({ email: e.target.value })
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
                  value={signUpFormUi.password}
                  onChange={e =>
                    dispatchSignUpFormUi({ password: e.target.value })
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
                    ) =>
                      value &&
                      value !== form.getFieldValue('password') &&
                      callback('비밀번호가 일치하지 않습니다.'),
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder="비밀번호 재입력"
                  value={signUpFormUi.rePassword}
                  onChange={e =>
                    dispatchSignUpFormUi({ rePassword: e.target.value })
                  }
                />
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('nickname', {
                rules: [{ required: true, message: '닉네임을 입력해주세요.' }],
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="닉네임"
                  value={signUpFormUi.nickname}
                  onChange={e =>
                    dispatchSignUpFormUi({ nickname: e.target.value })
                  }
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

const SignUpModal: React.FC<ISignUpModalProps> = ({
  setIsSignUpModal,
  isSignUpModal,
  signUpFormUi,
  dispatch,
}) => {
  const saveFormRef: any = useRef(null)

  const dispatchSignUpFormUi = (data: any) =>
    dispatch(
      changeSignUpFormUi({
        ...signUpFormUi,
        ...data,
      })
    )

  return (
    <div className="sign-up-modal-wrapper">
      // @ts-ignore
      <SignUpCreateForm
        wrappedComponentRef={saveFormRef}
        setIsSignUpModal={setIsSignUpModal}
        isSignUpModal={isSignUpModal}
        dispatchSignUpFormUi={dispatchSignUpFormUi}
        signUpFormUi={signUpFormUi}
      />
    </div>
  )
}

const mapStateToProps = createSelector(
  selectSignUpFormUi(),
  signUpFormUi => ({ signUpFormUi })
)

const withConnect = connect(mapStateToProps)

export default compose<ISignUpModalProps, ISignUpModalProps>(withConnect)(
  SignUpModal
)
