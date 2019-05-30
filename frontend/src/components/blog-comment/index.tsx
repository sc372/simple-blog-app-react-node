import React from 'react'
// import * as R from 'ramda'

import './styles.scss'
import { Avatar, Button, Input } from 'antd'

const BlogComment: React.FC = () => {
  // const mapIndexed = R.addIndex(R.map)

  return (
    <div className="blog-comment-wrapper">
      <div className="blog-comment-create">
        <Input
          placeholder="댓글을 입력해주세요."
          allowClear
          onChange={(e: any) => console.log('Line: 17', e)}
          onPressEnter={() => console.log('Line: 18', 'skldhsfkj')}
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

export default BlogComment
