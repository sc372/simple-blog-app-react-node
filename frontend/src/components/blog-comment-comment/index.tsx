import React, { ChangeEvent, useEffect, useState } from 'react'
import { Avatar, Button, Input } from 'antd'
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
  getUpdateBlogCommentCommentIsSuccess,
} from '../../redux/blog/selectors'
import {
  createBlogCommentComment,
  deleteBlogCommentComment,
  updateBlogCommentComment,
} from '../../redux/blog/actions'
import {
  confirmCreateCommentComment,
  confirmDeleteCommentComment,
  confirmUpdateCommentComment,
} from '../../utils/confirm'

import './styles.scss'

interface IBlogCommentCommentProps extends IDispatchable {
  readonly blogCommentId: string
  readonly accountUi: IAccountUi
  readonly accountDomain: IAccountDomain
  readonly blogUi: IBlogsUi
  readonly updateBlogCommentCommentIsSuccess: boolean
}

const BlogCommentComment: React.FC<IBlogCommentCommentProps> = ({
  blogCommentId,
  accountUi,
  accountDomain,
  blogUi,
  updateBlogCommentCommentIsSuccess,
  dispatch,
}) => {
  const mapIndexed = R.addIndex(R.map)
  const pickBlogComment = R.filter(
    v => v.id === blogCommentId,
    blogUi.blogComments
  )

  const [newCommentComment, setNewCommentComment] = useState('')
  const [updateCommentComment, setUpdateCommentComment] = useState('')
  const [isUpdateCommentComment, setIsUpdateCommentComment] = useState(false)
  const [
    blogCommentCommentIdForUpdateCommentComment,
    setBlogCommentCommentIdForUpdateCommentComment,
  ] = useState('')

  useEffect(() => {
    if (updateBlogCommentCommentIsSuccess) {
      setIsUpdateCommentComment(false)
      setUpdateCommentComment('')
      setBlogCommentCommentIdForUpdateCommentComment('')
    }
  }, [updateBlogCommentCommentIsSuccess]) // eslint-disable-line

  return (
    <div className="blog-comment-comment-wrapper">
      {accountUi.isLogin ? (
        <div className="blog-comment-comment-create">
          <Input
            placeholder="댓글을 입력해주세요."
            value={newCommentComment}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setNewCommentComment(e.target.value)
            }
            onPressEnter={() =>
              confirmCreateCommentComment(() => {
                dispatch(
                  createBlogCommentComment(newCommentComment, blogCommentId)
                )
                setNewCommentComment('')
              })
            }
            suffix={
              <Button
                type="primary"
                className="blog-comment-comment-submit"
                onClick={() =>
                  confirmCreateCommentComment(() => {
                    dispatch(
                      createBlogCommentComment(newCommentComment, blogCommentId)
                    )
                    setNewCommentComment('')
                  })
                }
                disabled={isUpdateCommentComment}
              >
                추가
              </Button>
            }
          />
        </div>
      ) : null}
      {mapIndexed(
        // @ts-ignore
        (v: IBlogsCommentUi, i: number) => (
          <div key={i} className="blog-comment-comment-item">
            <Avatar src={v.userFilePath} />
            <span className="blog-comment-comment-author">
              {v.userNickname}
            </span>
            <span className="blog-comment-comment-date">{v.createdAt}</span>
            {accountDomain.id === v.userId && !isUpdateCommentComment ? (
              <span className="blog-comment-btn">
                <Button
                  size="small"
                  type="danger"
                  onClick={() =>
                    confirmDeleteCommentComment(() =>
                      dispatch(deleteBlogCommentComment(v.id, blogCommentId))
                    )
                  }
                >
                  삭제
                </Button>
                <Button
                  size="small"
                  type="default"
                  onClick={() => {
                    setIsUpdateCommentComment(true)
                    setUpdateCommentComment(v.comment)
                    setBlogCommentCommentIdForUpdateCommentComment(v.id)
                  }}
                >
                  수정
                </Button>
              </span>
            ) : null}
            {isUpdateCommentComment &&
            v.id === blogCommentCommentIdForUpdateCommentComment ? (
              <div className="blog-comment-comment-update-wrapper">
                <Input
                  placeholder="수정할 댓글을 입력해주세요."
                  allowClear
                  value={updateCommentComment}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setUpdateCommentComment(e.target.value)
                  }
                  onPressEnter={() =>
                    confirmUpdateCommentComment(() => {
                      dispatch(
                        updateBlogCommentComment(updateCommentComment, v.id)
                      )
                    })
                  }
                />
                <span className="blog-comment-comment-update-btn">
                  <Button
                    size="small"
                    type="default"
                    onClick={() => {
                      setIsUpdateCommentComment(false)
                      setUpdateCommentComment('')
                      setBlogCommentCommentIdForUpdateCommentComment('')
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() =>
                      confirmUpdateCommentComment(() => {
                        dispatch(
                          updateBlogCommentComment(updateCommentComment, v.id)
                        )
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
          </div>
        ),
        // @ts-ignore
        pickBlogComment[0].blogCommentComments
      )}
    </div>
  )
}

const mapStateToProps = createSelector(
  getAccountUi(),
  getAccountDomain(),
  getBlogUi(),
  getUpdateBlogCommentCommentIsSuccess(),
  (accountUi, accountDomain, blogUi, updateBlogCommentCommentIsSuccess) => ({
    accountUi,
    accountDomain,
    blogUi,
    updateBlogCommentCommentIsSuccess,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IBlogCommentCommentProps, IBlogCommentCommentProps>(
  withConnect
)(
  // @ts-ignore
  compose<IBlogCommentCommentProps, IBlogCommentCommentProps>(withRouter)(
    BlogCommentComment
  )
)
