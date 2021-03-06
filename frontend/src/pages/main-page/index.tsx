import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../components/layouts'
import { Card, Col, Row, Input, Avatar, Icon, Typography, Empty } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as R from 'ramda'
import { withRouter } from 'react-router'
import { createSelector } from 'reselect'
import Fade from 'react-reveal/Fade'

import { IBlogsUi, IDispatchable } from '../../models'
import {
  getSelectBlogsIsLoading,
  getBlogsSearchText,
  getBlogsTotalCount,
  getBlogsUi,
} from '../../redux/blogs/selectors'
import { changeBlogsSearchText, selectBlogs } from '../../redux/blogs/actions'

import './styles.scss'

interface IMainPageProps extends IDispatchable {
  readonly blogsUi: IBlogsUi[]
  readonly blogsTotalCount: number
  readonly blogsSearchText: string
  readonly selectBlogsIsLoading: boolean
  readonly history: any
}

const MainPage: React.FC<IMainPageProps> = ({
  blogsUi,
  blogsTotalCount,
  blogsSearchText,
  selectBlogsIsLoading,
  history,
  dispatch,
}) => {
  const mapIndexed = R.addIndex(R.map)

  const scrollToTop = () =>
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  const [page, setPage] = useState(0)
  const [preLoading, setPreLoading] = useState(true)
  useEffect(() => {
    dispatch(selectBlogs(0, blogsSearchText))
  }, []) // eslint-disable-line

  useEffect(() => {
    if (selectBlogsIsLoading) {
      setPreLoading(false)
    }
  }, [selectBlogsIsLoading]) // eslint-disable-line

  const nextBlogsDispatch = () => {
    dispatch(selectBlogs(page + 1, blogsSearchText))
    setPage(page + 1)
  }

  return (
    <MainLayout>
      <div className="blog-search-wrapper">
        <p className="blog-search-input">
          <Input.Search
            placeholder="검색어를 입력하세요."
            onChange={(e: any) =>
              dispatch(changeBlogsSearchText(e.target.value))
            }
            onSearch={() => {
              setPage(0)
              dispatch(selectBlogs(0, blogsSearchText))
            }}
          />
        </p>
      </div>
      <div className="main-page-wrapper">
        {!preLoading && !selectBlogsIsLoading && blogsTotalCount === 0 && (
          <Empty
            className="empty-icon"
            description={<span>글이 없습니다.</span>}
          />
        )}
        <Row justify="start" align="middle">
          <InfiniteScroll
            dataLength={blogsTotalCount}
            next={nextBlogsDispatch}
            hasMore={true}
            loader={blogsTotalCount - blogsUi.length * page > 12 && <div />}
          >
            {mapIndexed(
              // @ts-ignore
              (v: IBlogsUi, i: number) => (
                <Col key={i} xs={24} sm={24} md={24} lg={12} xl={6}>
                  <Fade>
                    <div key={i} className="blog-item-card">
                      <Card
                        cover={
                          <img
                            alt=""
                            className="blog-item-img"
                            src={v.blogFilePath}
                          />
                        }
                      >
                        <Card.Meta
                          title={
                            <div
                              className="blog-item-title"
                              onClick={() => history.push(`/blogs/${v.id}`)}
                            >
                              <Typography.Paragraph
                                ellipsis
                                className="blog-item-title-text"
                              >
                                {v.title}
                              </Typography.Paragraph>
                            </div>
                          }
                          description={
                            <div>
                              <span className="blog-item-author-wrapper">
                                <Avatar src={v.userFilePath} />
                                <span className="blog-item-author">
                                  {v.nickname}
                                </span>
                              </span>
                              <span className="blog-item-date">
                                {v.createdAt}
                              </span>
                            </div>
                          }
                        />
                      </Card>
                    </div>
                  </Fade>
                </Col>
              ),
              blogsUi
            )}
          </InfiniteScroll>
        </Row>
      </div>
      {selectBlogsIsLoading && !R.isEmpty(blogsUi) && (
        <Icon type="loading" className="main-page-scroll-spinner" />
      )}
      <div className="scroll-to-top-btn-wrapper">
        <Icon
          type="up-circle"
          className="scroll-to-top-btn"
          onClick={() => scrollToTop()}
        />
      </div>
    </MainLayout>
  )
}

const mapStateToProps = createSelector(
  getBlogsUi(),
  getBlogsTotalCount(),
  getBlogsSearchText(),
  getSelectBlogsIsLoading(),
  (blogsUi, blogsTotalCount, blogsSearchText, selectBlogsIsLoading) => ({
    blogsUi,
    blogsTotalCount,
    blogsSearchText,
    selectBlogsIsLoading,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IMainPageProps, IMainPageProps>(withConnect)(
  // @ts-ignore
  compose<IMainPageProps, IMainPageProps>(withRouter)(MainPage)
)
