import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Row, Col, Button, Avatar } from 'antd'

import Responsive from '../../response-helper'
import { SideBar } from '../index'
import { SignUpModal, SignInModal } from '../../../index'

import './styles.scss'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const [isDrawerToggle, setIsDrawerToggleValue] = useState(false)
  const [isSignUpModal, setIsSignUpModal] = useState(false)
  const [isSignInModal, setIsSignInModal] = useState(false)

  return (
    <>
      <Responsive.Min1000>
        <Layout.Header className="header-wrapper">
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <Link to="/">
                <div className="header-logo">Simple Blog</div>
              </Link>
            </Col>
            <Col span={10}>
              <span className="header-menu-auth-btn-group">
                <Avatar
                  className="header-menu-auth-btn"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
                <Button
                  className="header-menu-auth-btn"
                  onClick={() => setIsSignUpModal(true)}
                >
                  회원가입
                </Button>
                <Button
                  className="header-menu-auth-btn"
                  type="primary"
                  onClick={() => setIsSignInModal(true)}
                >
                  로그인
                </Button>
              </span>
            </Col>
            <Col span={2}>
              <Icon
                className="header-menu-icon"
                type="menu"
                onClick={() => setIsDrawerToggleValue(true)}
              />
            </Col>
          </Row>
        </Layout.Header>
      </Responsive.Min1000>
      <Responsive.Max1000>
        <Layout.Header className="m-header-wrapper">
          <Row type="flex" justify="space-between">
            <Col span={12}>
              <Link to="/">
                <div className="m-header-logo">SB</div>
              </Link>
            </Col>
            <Col span={10}>
              <span className="m-header-menu-auth-btn-group">
                <Avatar
                  className="m-header-menu-auth-btn"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
                <Button
                  size="small"
                  className="m-header-menu-auth-btn"
                  onClick={() => setIsSignUpModal(true)}
                >
                  회원가입
                </Button>
                <Button
                  size="small"
                  className="m-header-menu-auth-btn"
                  type="primary"
                  onClick={() => setIsSignInModal(true)}
                >
                  로그인
                </Button>
              </span>
            </Col>
            <Col span={2}>
              <Icon
                type="menu"
                className="m-header-menu-icon"
                onClick={() => setIsDrawerToggleValue(true)}
              />
            </Col>
          </Row>
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
