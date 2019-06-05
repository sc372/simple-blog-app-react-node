import React, { ChangeEvent, useEffect, useState } from 'react'
import { Avatar, Button, Empty, Input } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as R from 'ramda'
import { withRouter } from 'react-router'
import { createSelector } from 'reselect'

import {
  IAccountDomain,
  IAccountUi,
  IBlogsCommentUi,
  IBlogsUi,
  IDispatchable,
} from '../../models'
import { getAccountDomain, getAccountUi } from '../../redux/account/selectors'
import {
  getBlogUi,
  getUpdateBlogCommentIsSuccess,
} from '../../redux/blog/selectors'
import {
  createBlogComment,
  deleteBlogComment,
  updateBlogComment,
} from '../../redux/blog/actions'
import BlogCommentComment from '../blog-comment-comment'
import {
  confirmCreateComment,
  confirmDeleteComment,
  confirmUpdateComment,
} from '../../utils/confirm'

import './styles.scss'

interface IBlogCommentProps extends IDispatchable {
  readonly accountUi: IAccountUi
  readonly accountDomain: IAccountDomain
  readonly blogUi: IBlogsUi
  readonly updateBlogCommentIsSuccess: boolean
}

const BlogComment: React.FC<IBlogCommentProps> = ({
  accountUi,
  accountDomain,
  blogUi,
  updateBlogCommentIsSuccess,
  dispatch,
}) => {
  const mapIndexed = R.addIndex(R.map)
  const [newComment, setNewComment] = useState('')
  const [updateComment, setUpdateComment] = useState('')
  const [isUpdateComment, setIsUpdateComment] = useState(false)
  const [
    blogCommentIdForUpdateComment,
    setBlogCommentIdForUpdateComment,
  ] = useState('')

  useEffect(() => {
    if (updateBlogCommentIsSuccess) {
      setIsUpdateComment(false)
      setUpdateComment('')
      setBlogCommentIdForUpdateComment('')
    }
  }, [updateBlogCommentIsSuccess]) // eslint-disable-line

  return (
    <div className="blog-comment-wrapper">
      {accountUi.isLogin ? (
        <div className="blog-comment-create">
          <Input
            placeholder="댓글을 입력해주세요."
            value={newComment}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setNewComment(e.target.value)
            }
            onPressEnter={() =>
              confirmCreateComment(() => {
                dispatch(createBlogComment(newComment))
                setNewComment('')
              })
            }
            suffix={
              <Button
                type="primary"
                className="blog-comment-submit"
                onClick={() =>
                  confirmCreateComment(() => {
                    dispatch(createBlogComment(newComment))
                    setNewComment('')
                  })
                }
                disabled={isUpdateComment}
              >
                추가
              </Button>
            }
          />
        </div>
      ) : null}
      {R.isEmpty(blogUi.blogComments) ? (
        <Empty description={<span>댓글이 없습니다.</span>} />
      ) : (
        mapIndexed(
          // @ts-ignore
          (v: IBlogsCommentUi, i: number) => (
            <div key={i} className="blog-comment-item">
              <hr />
              <Avatar src={v.userFilePath} />
              <span className="blog-comment-author">{v.userNickname}</span>
              <span className="blog-comment-date">{v.createdAt}</span>
              {accountDomain.id === v.userId && !isUpdateComment ? (
                <span className="blog-comment-btn">
                  <Button
                    size="small"
                    type="danger"
                    onClick={() =>
                      confirmDeleteComment(() => {
                        dispatch(deleteBlogComment(v.id))
                      })
                    }
                  >
                    삭제
                  </Button>
                  <Button
                    size="small"
                    type="default"
                    onClick={() => {
                      setIsUpdateComment(true)
                      setUpdateComment(v.comment)
                      setBlogCommentIdForUpdateComment(v.id)
                    }}
                  >
                    수정
                  </Button>
                </span>
              ) : null}
              {isUpdateComment && v.id === blogCommentIdForUpdateComment ? (
                <div className="blog-comment-update-wrapper">
                  <Input
                    placeholder="수정할 댓글을 입력해주세요."
                    allowClear
                    value={updateComment}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                      setUpdateComment(e.target.value)
                    }
                    onPressEnter={() =>
                      confirmUpdateComment(() => {
                        dispatch(updateBlogComment(updateComment, v.id))
                      })
                    }
                  />
                  <span className="blog-comment-update-btn">
                    <Button
                      size="small"
                      type="default"
                      onClick={() => {
                        setIsUpdateComment(false)
                        setUpdateComment('')
                        setBlogCommentIdForUpdateComment('')
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() =>
                        confirmUpdateComment(() => {
                          dispatch(updateBlogComment(updateComment, v.id))
                        })
                      }
                    >
                      수정
                    </Button>
                  </span>
                </div>
              ) : (
                <p className="blog-comment-content">{v.comment}</p>
              )}
              {/*
               // @ts-ignore */}
              <BlogCommentComment blogCommentId={v.id} />
            </div>
          ),
          blogUi.blogComments
        )
      )}
    </div>
  )
}

const mapStateToProps = createSelector(
  getAccountUi(),
  getAccountDomain(),
  getBlogUi(),
  getUpdateBlogCommentIsSuccess(),
  (accountUi, accountDomain, blogUi, updateBlogCommentIsSuccess) => ({
    accountUi,
    accountDomain,
    blogUi,
    updateBlogCommentIsSuccess,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IBlogCommentProps, IBlogCommentProps>(withConnect)(
  // @ts-ignore
  compose<IBlogCommentProps, IBlogCommentProps>(withRouter)(BlogComment)
)
