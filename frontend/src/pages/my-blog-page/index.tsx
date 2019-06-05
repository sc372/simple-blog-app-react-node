import React, { useEffect } from 'react'
import { Button, Input, Typography } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createSelector } from 'reselect'
import { Link } from 'react-router-dom'

import { MainLayout } from '../../components/layouts'
import { MyBlogTable } from '../../components'
import { IDispatchable, IMyBlogsUi } from '../../models'
import {
  getMyBlogsSearchText,
  getMyBlogsTotalCount,
  getMyBlogsUi,
} from '../../redux/my-blogs/selectors'
import {
  changeMyBlogsSearchText,
  selectMyBlogs,
} from '../../redux/my-blogs/actions'

import './styles.scss'

interface IMyBlogPageProps extends IDispatchable {
  readonly myBlogsUi: IMyBlogsUi
  readonly myBlogsTotalCount: number
  readonly myBlogsSearchText: string
}

const MyBlogPage: React.FC<IMyBlogPageProps> = ({
  myBlogsUi,
  myBlogsTotalCount,
  myBlogsSearchText,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(selectMyBlogs(0, myBlogsSearchText))
  }, []) // eslint-disable-line

  const pagination = {
    pageSize: 7,
    total: myBlogsTotalCount,
    onChange: (
      page: any,
      pageSize: any // eslint-disable-line @typescript-eslint/no-unused-vars
    ) => dispatch(selectMyBlogs(page - 1, myBlogsSearchText)),
  }

  return (
    <MainLayout>
      <div className="my-blog-page-wrapper">
        <Typography.Title level={2}>내가 작성한 글</Typography.Title>
        <br />
        <br />
        <div>
          <Input
            className="my-blog-page-search-input"
            placeholder="제목을 검색해주세요."
            allowClear
            onChange={(e: any) =>
              dispatch(changeMyBlogsSearchText(e.target.value))
            }
            onPressEnter={() => dispatch(selectMyBlogs(0, myBlogsSearchText))}
          />
          <Button
            type="default"
            icon="search"
            htmlType="button"
            onClick={() => dispatch(selectMyBlogs(0, myBlogsSearchText))}
          >
            검색
          </Button>
          <Link to="/create-blog">
            <Button
              className="my-blog-page-create-btn"
              type="primary"
              icon="edit"
              htmlType="button"
            >
              글 작성
            </Button>
          </Link>
          {/*
        // @ts-ignore */}
          <MyBlogTable dataSource={myBlogsUi} pagination={pagination} />
        </div>
      </div>
    </MainLayout>
  )
}

const mapStateToProps = createSelector(
  getMyBlogsUi(),
  getMyBlogsTotalCount(),
  getMyBlogsSearchText(),
  (myBlogsUi, myBlogsTotalCount, myBlogsSearchText) => ({
    myBlogsUi,
    myBlogsTotalCount,
    myBlogsSearchText,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IMyBlogPageProps, IMyBlogPageProps>(withConnect)(
  MyBlogPage
)
