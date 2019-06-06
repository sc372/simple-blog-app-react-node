import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { Button, Icon } from 'antd'

import { MainLayout } from '../../components/layouts'
import { IDispatchable } from '../../models'

import './styles.scss'

interface INotFoundPageProps extends IDispatchable {
  readonly history: any
}

const NotFoundPage: React.FC<INotFoundPageProps> = ({ history }) => {
  return (
    <MainLayout>
      <div className="not-found-page-wrapper">
        <div className="not-found-img-wrapper">
          <img className="not-found-img" src="404.jpg" alt="" />
          <div>
            <Button type="primary" onClick={() => history.push('/')}>
              <Icon type="left" />
              메인 페이지로 이동
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

const withConnect = connect()

export default compose<INotFoundPageProps, INotFoundPageProps>(withConnect)(
  // @ts-ignore
  compose<INotFoundPageProps, INotFoundPageProps>(withRouter)(NotFoundPage)
)
