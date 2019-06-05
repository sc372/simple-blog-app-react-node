import React, { ChangeEvent, useEffect, useState } from 'react'
import { Avatar, Button, Empty, Input, Modal } from 'antd'
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

  const dispatchCreateComment = () =>
    Modal.confirm({
      title: '댓글 작성',
      content: '댓글을 작성하시겠습니까?',
      okText: '작성',
      cancelText: '취소',
      centered: true,
      onOk() {
        dispatch(createBlogComment(newComment))
        setNewComment('')
      },
      onCancel() {
        console.log('Cancel')
      },
    })

  const dispatchUpdateComment = (blogCommentId: string) =>
    Modal.confirm({
      title: '댓글 수정',
      content: '댓글을 수정하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      centered: true,
      onOk() {
        dispatch(updateBlogComment(updateComment, blogCommentId))
      },
      onCancel() {
        console.log('Cancel')
      },
    })

  const dispatchDeleteComment = (blogCommentId: string) =>
    Modal.confirm({
      title: '댓글 삭제',
      content: '댓글을 삭제하시겠습니까?(댓글의 댓글은 모두 삭제됩니다.)',
      okText: '삭제',
      cancelText: '취소',
      centered: true,
      okType: 'danger',
      onOk() {
        dispatch(deleteBlogComment(blogCommentId))
      },
      onCancel() {
        console.log('Cancel')
      },
    })

  return (
    <div className="blog-comment-wrapper">
      {accountUi.isLogin ? (
        <div className="blog-comment-create">
          <Input
            placeholder="댓글을 입력해주세요."
            allowClear
            value={newComment}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setNewComment(e.target.value)
            }
            onPressEnter={dispatchCreateComment}
          />
          <Button
            type="primary"
            className="blog-comment-submit"
            onClick={dispatchCreateComment}
            disabled={isUpdateComment}
          >
            댓글 추가
          </Button>
        </div>
      ) : null}
      {R.isEmpty(blogUi.blogComment) ? (
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
                    onClick={() => dispatchDeleteComment(v.id)}
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
                    onPressEnter={() => dispatchUpdateComment(v.id)}
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
                      onClick={() => dispatchUpdateComment(v.id)}
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
          blogUi.blogComment
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
