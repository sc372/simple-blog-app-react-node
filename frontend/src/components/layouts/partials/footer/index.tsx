import React from 'react'
import { Layout } from 'antd'

import './styles.scss'

const Footer: React.FC = () => {
  return (
    <Layout.Footer className="footer-wrapper">
      <div>
        © {new Date().getFullYear()}{' '}
        <span className="title-text">Simple Blog</span> All Rights Reserved.
      </div>
    </Layout.Footer>
  )
}

export default Footer
