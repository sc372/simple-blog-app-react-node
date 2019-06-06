import React, { Dispatch, SetStateAction } from 'react'
import { Drawer, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Responsive from '../../response-helper'
import { IDispatchable } from '../../../../models'

import './styles.scss'

interface ISideBarProps extends IDispatchable {
  readonly setIsDrawerToggleValue: Dispatch<SetStateAction<boolean>>
  readonly isDrawerToggle: boolean
}

const Sidebar: React.FC<ISideBarProps> = ({
  setIsDrawerToggleValue,
  isDrawerToggle,
}) => {
  return (
    <>
      <Responsive.Min1000>
        <Drawer
          placement="right"
          closable={false}
          width={400}
          bodyStyle={{
            backgroundColor: '#fff',
            height: '100%',
          }}
          onClose={(): void => setIsDrawerToggleValue(false)}
          visible={isDrawerToggle}
        >
          <div className="header-menu-dismiss-wrapper">
            <div className="header-menu-dismiss-icon">
              <Icon
                type="close"
                onClick={(): void => setIsDrawerToggleValue(false)}
              />
            </div>
          </div>
          <div className="header-menu-link-wrapper">
            <Link to="/" onClick={(): void => setIsDrawerToggleValue(false)}>
              <div className="header-menu-link-item">메인 페이지</div>
            </Link>
            <Link
              to="/my/blog"
              onClick={(): void => setIsDrawerToggleValue(false)}
            >
              <div className="header-menu-link-item">내가 작성한 글</div>
            </Link>
            <Link to="/my" onClick={(): void => setIsDrawerToggleValue(false)}>
              <div className="header-menu-link-item">나의 정보</div>
            </Link>
            <a
              href="/"
              onClick={(): void => {
                localStorage.clear()
                setIsDrawerToggleValue(false)
              }}
            >
              <div className="header-menu-link-item">로그 아웃</div>
            </a>
          </div>
        </Drawer>
      </Responsive.Min1000>
      <Responsive.Max1000>
        <Drawer
          placement="right"
          closable={false}
          width={200}
          bodyStyle={{
            backgroundColor: '#fff',
            height: '100%',
          }}
          onClose={(): void => setIsDrawerToggleValue(false)}
          visible={isDrawerToggle}
        >
          <div className="m-header-menu-dismiss-wrapper">
            <div className="m-header-menu-dismiss-icon">
              <Icon
                type="close"
                onClick={(): void => setIsDrawerToggleValue(false)}
              />
            </div>
          </div>
          <div className="m-header-menu-link-wrapper">
            <Link to="/" onClick={(): void => setIsDrawerToggleValue(false)}>
              <div className="m-header-menu-link-item">메인 페이지</div>
            </Link>
            <Link
              to="/my/blog"
              onClick={(): void => setIsDrawerToggleValue(false)}
            >
              <div className="m-header-menu-link-item">내가 작성한 글</div>
            </Link>
            <Link to="/my" onClick={(): void => setIsDrawerToggleValue(false)}>
              <div className="m-header-menu-link-item">나의 정보</div>
            </Link>
            <a
              href="/"
              onClick={(): void => {
                localStorage.clear()
                setIsDrawerToggleValue(false)
              }}
            >
              <div className="m-header-menu-link-item">로그 아웃</div>
            </a>
          </div>
        </Drawer>
      </Responsive.Max1000>
    </>
  )
}

const withConnect = connect()

export default compose<ISideBarProps, ISideBarProps>(withConnect)(Sidebar)
