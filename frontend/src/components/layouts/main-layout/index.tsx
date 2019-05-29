import React from 'react'
import { Layout } from 'antd'
import { Header, Footer } from '../partials'

import './styles.scss'

interface IMainLayoutProps {
  readonly children?: React.ReactNode
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout-wrapper">
      <Header />
      {children}
      <Footer />
    </Layout>
  )
}

export default MainLayout
