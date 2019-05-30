import React, { Dispatch, SetStateAction, useState } from 'react'
import { Icon, Input, Modal, Typography } from 'antd'
import * as R from 'ramda'

import './styles.scss'

interface ISignUpModalProps {
  setIsSignUpModal: Dispatch<SetStateAction<boolean>>
  isSignUpModal: boolean
}

const SignUpModal: React.FC<ISignUpModalProps> = ({
  setIsSignUpModal,
  isSignUpModal,
}) => {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('') // eslint-disable-next-line
  const [isValidNickname, setIsValidNickname] = useState(false) // eslint-disable-next-line
  const [isValidEmail, setIsValidEmail] = useState(false) // eslint-disable-next-line
  const [isValidPassword, setIsValidPassword] = useState(false) // eslint-disable-next-line
  const [isValidRePassword, setIsValidRePassword] = useState(false) // eslint-disable-next-line
  const [validMessageNickname, setValidMessageNickname] = useState('') // eslint-disable-next-line
  const [validMessageEmail, setValidMessageEmail] = useState('') // eslint-disable-next-line
  const [validMessagePassword, setValidMessagePassword] = useState('') // eslint-disable-next-line
  const [validMessageRePassword, setValidMessageRePassword] = useState('')

  const closeModal = () => setIsSignUpModal(false)

  return (
    <div className="sign-up-modal-wrapper">
      <Modal
        title="회원가입"
        centered
        okText="회원가입"
        cancelText="취소"
        visible={isSignUpModal}
        onOk={() => {
          const nicknameValid = !R.isEmpty(nickname)
          const emailValid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
            email
          )
          const passwordValid = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{6,12}$/.test(
            password
          )
          const rePasswordValid = password === rePassword

          if (nicknameValid && emailValid && passwordValid && rePasswordValid) {
            closeModal()
          }
        }}
        onCancel={() => closeModal()}
      >
        <Input
          prefix={<Icon type="user" />}
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        {!isValidNickname && !R.isEmpty(validMessageNickname) && (
          <Typography.Text type="warning">
            {validMessageNickname}
          </Typography.Text>
        )}
        <br />
        <br />
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
        <br />
        <br />
        <Input
          prefix={<Icon type="lock" />}
          type="password"
          placeholder="비밀번호 재입력"
          value={rePassword}
          onChange={e => setRePassword(e.target.value)}
        />
        {!isValidRePassword && !R.isEmpty(validMessageRePassword) && (
          <Typography.Text type="warning">
            {validMessageRePassword}
          </Typography.Text>
        )}
      </Modal>
    </div>
  )
}

export default SignUpModal
