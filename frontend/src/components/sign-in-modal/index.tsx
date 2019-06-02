import React, { Dispatch, SetStateAction, useRef } from 'react'
import { Checkbox, Form, Icon, Input, Modal } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'

import { selectSignInFormUi } from '../../redux/auth/selectors'
import { IDispatchable, ISignInFormUi } from '../../models'

import './styles.scss'
import { changeSignInFormUi } from '../../redux/auth/actions'
import { selectAccount } from '../../redux/account/actions'

interface ISignInModalProps extends IDispatchable {
  readonly setIsSignInModal: Dispatch<SetStateAction<boolean>>
  readonly isSignInModal: boolean
  readonly signInFormUi: ISignInFormUi
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
        dispatchSignInFormUi,
        // @ts-ignore
        dispatchSelectAccount,
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
            setIsSignInModal(false)
            console.log('Line: 49', 'skjhdfksjsd')
            console.log('Line: 49', 'skjhdfksjsd')
            console.log('Line: 49', 'skjhdfksjsd')
            console.log('Line: 49', 'skjhdfksjsd')
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
            dispatchSignInFormUi({
              email: '',
              password: '',
              isAutoLogin: false,
            })
            setIsSignInModal(false)
          }}
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
                  value={signInFormUi.email}
                  onChange={e =>
                    dispatchSignInFormUi({ email: e.target.value })
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
                  value={signInFormUi.password}
                  onChange={e =>
                    dispatchSignInFormUi({ password: e.target.value })
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
                  checked={signInFormUi.isAutoLogin}
                  onChange={() =>
                    dispatchSignInFormUi({
                      isAutoLogin: !signInFormUi.isAutoLogin,
                    })
                  }
                >
                  자동 로그인
                </Checkbox>
              )}
            </Form.Item>
          </Form>
        </Modal>
      )
    }
  }
)

const SignInModal: React.FC<ISignInModalProps> = ({
  setIsSignInModal,
  isSignInModal,
  signInFormUi,
  dispatch,
}) => {
  const saveFormRef: any = useRef(null)

  const dispatchSignInFormUi = (data: any) =>
    dispatch(
      changeSignInFormUi({
        ...signInFormUi,
        ...data,
      })
    )

  const dispatchSelectAccount = () => dispatch(selectAccount())

  return (
    <div className="sign-in-modal-wrapper">
      // @ts-ignore
      <SignInCreateForm
        wrappedComponentRef={saveFormRef}
        setIsSignInModal={setIsSignInModal}
        isSignInModal={isSignInModal}
        signInFormUi={signInFormUi}
        dispatchSignInFormUi={dispatchSignInFormUi}
        dispatchSelectAccount={dispatchSelectAccount}
      />
    </div>
  )
}

const mapStateToProps = createSelector(
  selectSignInFormUi(),
  signInFormUi => ({ signInFormUi })
)

const withConnect = connect(mapStateToProps)

export default compose<ISignInModalProps, ISignInModalProps>(withConnect)(
  SignInModal
)
