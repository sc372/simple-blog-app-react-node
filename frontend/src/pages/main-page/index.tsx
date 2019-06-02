import React from 'react'
import { MainLayout } from '../../components/layouts'
import { Card, Col, Row, Input, Avatar, Icon, Typography } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { IDispatchable } from '../../models'

import './styles.scss'

interface IMainPageProps extends IDispatchable {}

const MainPage: React.FC<IMainPageProps> = () => {
  return (
    <MainLayout>
      <div className="blog-search-wrapper">
        <p className="blog-search-input">
          <Input.Search
            placeholder="검색어를 입력하세요."
            onSearch={(v: string) => console.log('Line: 18', v)}
          />
        </p>
      </div>
      <div className="main-page-wrapper">
        <Row type="flex" justify="start" align="middle">
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph ellipsis>
                      ddddddddddddddddddddddddddddddd
                    </Typography.Paragraph>
                  }
                  avatar={
                    <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                  }
                  description={
                    <div>
                      <span className="blog-item-author">상자</span>
                      <span className="blog-item-date">2019/06/01</span>
                    </div>
                  }
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div className="blog-item-card">
              <Card
                hoverable
                cover={
                  <img
                    alt="example"
                    className="blog-item-img"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <Card.Meta
                  title="Europe Street beat"
                  description="www.instagram.com"
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Icon type="loading" className="main-page-scroll-spinner" />
    </MainLayout>
  )
}

const withConnect = connect()

export default compose<IMainPageProps, IMainPageProps>(withConnect)(MainPage)
