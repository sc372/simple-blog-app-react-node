import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { Layout, Icon, Button, Avatar } from 'antd'

import Responsive from '../../response-helper'
import { SideBar } from '../index'
import { SignUpModal, SignInModal } from '../../../index'

import {
  getAccountIsLoading,
  getAccountUi,
} from '../../../../redux/account/selectors'
import { IDispatchable } from '../../../../models'
import { IAccountUi } from '../../../../models/account'

import './styles.scss'

interface IHeaderProps extends IDispatchable {
  readonly accountUi: IAccountUi
  readonly accountIsLoading: boolean
  readonly history: any
}

const Header: React.FC<IHeaderProps> = ({
  accountUi,
  accountIsLoading,
  history,
}) => {
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
          {accountUi.isLogin ? (
            <>
              <span
                className="header-avatar-wrapper"
                onClick={() => history.push('/my')}
              >
                <Avatar className="header-avatar" src={accountUi.filePath} />
              </span>
              <Icon
                className="header-menu-icon"
                type="menu"
                onClick={(): void => setIsDrawerToggleValue(true)}
              />
            </>
          ) : accountIsLoading ? (
            <Icon className="header-loading-icon" type="loading" />
          ) : (
            <>
              <Button
                className="header-sign-up-btn"
                onClick={() => setIsSignUpModal(true)}
              >
                회원가입
              </Button>
              <Button
                className="header-sign-in-btn"
                type="primary"
                onClick={() => setIsSignInModal(true)}
              >
                로그인
              </Button>
            </>
          )}
        </Layout.Header>
      </Responsive.Min1000>
      <Responsive.Max1000>
        <Layout.Header className="m-header-wrapper">
          <Link to="/">
            <div className="m-header-logo">SB</div>
          </Link>
          {accountUi.isLogin ? (
            <>
              <span
                className="m-header-avatar-wrapper"
                onClick={() => history.push('/my')}
              >
                <Avatar className="m-header-avatar" src={accountUi.filePath} />
              </span>
              <span className="m-header-menu-icon">
                <Icon
                  type="menu"
                  onClick={() => setIsDrawerToggleValue(true)}
                />
              </span>
            </>
          ) : accountIsLoading ? (
            <Icon className="m-header-loading-icon" type="loading" />
          ) : (
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
          )}
        </Layout.Header>
      </Responsive.Max1000>
      {/*
        // @ts-ignore */}
      <SideBar
        setIsDrawerToggleValue={setIsDrawerToggleValue}
        isDrawerToggle={isDrawerToggle}
      />
      {/*
        // @ts-ignore */}
      <SignUpModal
        setIsSignUpModal={setIsSignUpModal}
        isSignUpModal={isSignUpModal}
      />
      {/*
        // @ts-ignore */}
      <SignInModal
        setIsSignInModal={setIsSignInModal}
        isSignInModal={isSignInModal}
      />
    </>
  )
}

const mapStateToProps = createSelector(
  getAccountUi(),
  getAccountIsLoading(),
  (accountUi, accountIsLoading) => ({
    accountUi,
    accountIsLoading,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IHeaderProps, IHeaderProps>(withConnect)(
  // @ts-ignore
  compose<IHeaderProps, IHeaderProps>(withRouter)(Header)
)
