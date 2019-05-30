import React, { Dispatch, SetStateAction, useState } from 'react'
import { Icon, Input, Modal, Typography } from 'antd'
import * as R from 'ramda'

import './styles.scss'

interface ISignInModalProps {
  setIsSignInModal: Dispatch<SetStateAction<boolean>>
  isSignInModal: boolean
}

const SignInModal: React.FC<ISignInModalProps> = ({
  setIsSignInModal,
  isSignInModal,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') // eslint-disable-next-line
  const [isValidEmail, setIsValidEmail] = useState(false) // eslint-disable-next-line
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [validMessageEmail, setValidMessageEmail] = useState('')
  const [validMessagePassword, setValidMessagePassword] = useState('')

  const closeModal = () => setIsSignInModal(false)

  return (
    <div className="sign-in-modal-wrapper">
      <Modal
        title="로그인"
        centered
        visible={isSignInModal}
        okText="로그인"
        cancelText="취소"
        onOk={() => {
          const emailValid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
            email
          )
          const passwordValid = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{6,12}$/.test(
            password
          )

          if (emailValid && passwordValid) {
            closeModal()
          } else if (!emailValid && passwordValid) {
            setValidMessageEmail('이메일 형식이 아닙니다.')
            setValidMessagePassword('')
          } else if (emailValid && !passwordValid) {
            setValidMessagePassword(
              '비밀번호는 숫자, 문자, 특수문자 포함 6~12자리를 입력해주세요.'
            )
            setValidMessageEmail('')
          } else if (!emailValid && !passwordValid) {
            setValidMessageEmail('이메일 형식이 아닙니다.')
            setValidMessagePassword(
              '비밀번호는 숫자, 문자, 특수문자 포함 6~12자리를 입력해주세요.'
            )
          }
        }}
        onCancel={() => closeModal()}
      >
        <Input
          prefix={<Icon type="mail" />}
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {!isValidEmail && !R.isEmpty(validMessageEmail) && (
          <Typography.Text type="warning">{validMessageEmail}</Typography.Text>
        )}
        <br />
        <br />
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {!isValidPassword && !R.isEmpty(validMessagePassword) && (
          <Typography.Text type="warning">
            {validMessagePassword}
          </Typography.Text>
        )}
      </Modal>
    </div>
  )
}

export default SignInModal
