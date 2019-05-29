import React from 'react'
import { MainLayout } from '../../components/layouts'
import { Card, Col, Row, Input } from 'antd'

import './styles.scss'

const MainPage: React.FC = () => {
  // const mapIndexed = R.addIndex(R.map)
  // const scrollToTop = () =>
  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

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
    </MainLayout>
  )
}

export default MainPage
