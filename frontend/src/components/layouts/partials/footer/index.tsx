import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { IDispatchable } from '../../../../models'

import './styles.scss'

interface IMainLayoutProps extends IDispatchable {}

const Footer: React.FC<IMainLayoutProps> = () => {
  return (
    <Layout.Footer className="footer-wrapper">
      <div>
        © {new Date().getFullYear()}{' '}
        <span className="title-text">Simple Blog</span> All Rights Reserved.
      </div>
    </Layout.Footer>
  )
}

const withConnect = connect()

export default compose<IMainLayoutProps, IMainLayoutProps>(withConnect)(Footer)
