import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Avatar } from 'antd'

import Responsive from '../../response-helper'
import { SideBar } from '../index'
import { SignUpModal, SignInModal } from '../../../index'

import './styles.scss'

const Header: React.FC = () => {
  const [isDrawerToggle, setIsDrawerToggleValue] = useState(false)
  const [isSignUpModal, setIsSignUpModal] = useState(false)
  const [isSignInModal, setIsSignInModal] = useState(false)

  return (
    <>
      <Responsive.Min1000>
        <Layout.Header className="header-wrapper">
          <Link to="/">
            <div className="header-logo">Simple Blog</div>
          </Link>
          {/*<>*/}
          {/*<Button*/}
          {/*className="header-sign-up-btn"*/}
          {/*onClick={() => setIsSignUpModal(true)}*/}
          {/*>*/}
          {/*회원가입*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*className="header-sign-in-btn"*/}
          {/*type="primary"*/}
          {/*onClick={() => setIsSignInModal(true)}*/}
          {/*>*/}
          {/*로그인*/}
          {/*</Button>*/}
          {/*</>*/}
          <>
            <Avatar
              className="header-avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <Icon
              className="header-menu-icon"
              type="menu"
              onClick={(): void => setIsDrawerToggleValue(true)}
            />
          </>
        </Layout.Header>
      </Responsive.Min1000>
      <Responsive.Max1000>
        <Layout.Header className="m-header-wrapper">
          <Link to="/">
            <div className="m-header-logo">SB</div>
          </Link>
          <>
            <Button
              size="small"
              className="m-header-sign-up-btn"
              onClick={(): void => setIsSignUpModal(true)}
            >
              회원가입
            </Button>
            <Button
              size="small"
              className="m-header-sign-in-btn"
              type="primary"
              onClick={(): void => setIsSignInModal(true)}
            >
              로그인
            </Button>
          </>
          {/*<>*/}
          {/*<Avatar*/}
          {/*className="m-header-avatar"*/}
          {/*src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"*/}
          {/*/>*/}
          {/*<span className="m-header-menu-icon">*/}
          {/*<Icon*/}
          {/*type="menu"*/}
          {/*onClick={() => setIsDrawerToggleValue(true)}*/}
          {/*/>*/}
          {/*</span>*/}
          {/*</>*/}
        </Layout.Header>
      </Responsive.Max1000>
      <SideBar
        setIsDrawerToggleValue={setIsDrawerToggleValue}
        isDrawerToggle={isDrawerToggle}
      />
      {isSignUpModal && (
        <SignUpModal
          setIsSignUpModal={setIsSignUpModal}
          isSignUpModal={isSignUpModal}
        />
      )}
      {isSignInModal && (
        <SignInModal
          setIsSignInModal={setIsSignInModal}
          isSignInModal={isSignInModal}
        />
      )}
    </>
  )
}

export default Header
