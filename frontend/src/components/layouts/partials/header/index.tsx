import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Row, Col, Drawer } from 'antd'
import Responsive from '../../response-helper'

import './styles.scss'

const Header: React.FC = () => {
  const [isDrawerToggle, setIsDrawerToggleValue] = useState(false)

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
            <Col span={12}>
              <div className="header-menu-icon">
                <Icon
                  type="menu"
                  onClick={() => setIsDrawerToggleValue(true)}
                />
              </div>
            </Col>
          </Row>
          <Drawer
            placement="right"
            closable={false}
            width={400}
            bodyStyle={{
              backgroundColor: '#E6E6FA',
              height: '100%',
            }}
            onClose={() => setIsDrawerToggleValue(false)}
            visible={isDrawerToggle}
          >
            <Link to="/my">마이 페이지</Link>
            <Link to="/my/blog">내가 쓴 글</Link>
          </Drawer>
        </Layout.Header>
      </Responsive.Min1000>
    </>
  )
}

export default Header
