import React, { ChangeEvent } from 'react'
import { Avatar, Button, Input } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
// import * as R from 'ramda'

import { IDispatchable } from '../../models'

import './styles.scss'

interface IBlogCommentProps extends IDispatchable {}

const BlogComment: React.FC<IBlogCommentProps> = () => {
  // const mapIndexed = R.addIndex(R.map)

  return (
    <div className="blog-comment-wrapper">
      <div className="blog-comment-create">
        <Input
          placeholder="댓글을 입력해주세요."
          allowClear
          onChange={(e: ChangeEvent<HTMLInputElement>): void =>
            console.log('Line: 17', e)
          }
          onPressEnter={(): void => console.log('Line: 18', 'skldhsfkj')}
        />
        <Button type="primary" className="blog-comment-submit">
          댓글 추가
        </Button>
      </div>
      <div className="blog-comment-item">
        <hr />
        <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        <span className="blog-comment-author">상자</span>
        <span className="blog-comment-date">2019/06/01</span>
        <span className="blog-comment-delete">
          <Button size="small" type="danger">
            삭제
          </Button>
        </span>
        <p className="blog-comment-content">
          project members, which comprehensively promotes experience and
          development efficiency of background project members, which
          comprehensively promotes experience and development efficiency of
          background
        </p>
      </div>
      <div className="blog-comment-item">
        <hr />
        <Avatar src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        <span className="blog-comment-author">상자</span>
        <span className="blog-comment-date">2019/06/01</span>
        <p className="blog-comment-content">
          project members, which comprehensively promotes experience and
          development efficiency of background project members, which
          comprehensively promotes experience and development efficiency of
          background
        </p>
      </div>
    </div>
  )
}

const withConnect = connect()

export default compose<IBlogCommentProps, IBlogCommentProps>(withConnect)(
  BlogComment
)
