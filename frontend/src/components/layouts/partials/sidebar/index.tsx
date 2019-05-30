import React, { Dispatch, SetStateAction } from 'react'
import { Drawer, Icon } from 'antd'
import { Link } from 'react-router-dom'
import Responsive from '../../response-helper'

import './styles.scss'

interface ISideBarProps {
  setIsDrawerToggleValue: Dispatch<SetStateAction<boolean>>
  isDrawerToggle: boolean
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
          onClose={() => setIsDrawerToggleValue(false)}
          visible={isDrawerToggle}
        >
          <div className="header-menu-dismiss-wrapper">
            <div className="header-menu-dismiss-icon">
              <Icon
                type="close"
                onClick={() => setIsDrawerToggleValue(false)}
              />
            </div>
          </div>
          <div className="header-menu-link-wrapper">
            <Link to="/" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="header-menu-link-item">메인 페이지</div>
            </Link>
            <Link to="/my/blog" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="header-menu-link-item">내가 작성한 글</div>
            </Link>
            <Link to="/my" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="header-menu-link-item">나의 정보</div>
            </Link>
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
          onClose={() => setIsDrawerToggleValue(false)}
          visible={isDrawerToggle}
        >
          <div className="m-header-menu-dismiss-wrapper">
            <div className="m-header-menu-dismiss-icon">
              <Icon
                type="close"
                onClick={() => setIsDrawerToggleValue(false)}
              />
            </div>
          </div>
          <div className="m-header-menu-link-wrapper">
            <Link to="/" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="m-header-menu-link-item">메인 페이지</div>
            </Link>
            <Link to="/my/blog" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="m-header-menu-link-item">내가 작성한 글</div>
            </Link>
            <Link to="/my" onClick={() => setIsDrawerToggleValue(false)}>
              <div className="m-header-menu-link-item">나의 정보</div>
            </Link>
          </div>
        </Drawer>
      </Responsive.Max1000>
    </>
  )
}

export default Sidebar
