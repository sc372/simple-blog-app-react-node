import React from 'react'
import { Layout } from 'antd'
import { Header, Footer } from '../partials'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import './styles.scss'

interface IMainLayoutProps extends React.HTMLAttributes<any> {
  readonly children?: any
}

// todo: typescript error check
const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout-wrapper">
      // @ts-ignore
      <Header />
      {children}
      // @ts-ignore
      <Footer />
    </Layout>
  )
}

const withConnect = connect()

export default compose<IMainLayoutProps, IMainLayoutProps>(withConnect)(
  MainLayout
)
