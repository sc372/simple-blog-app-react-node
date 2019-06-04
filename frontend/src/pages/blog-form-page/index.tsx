import React, { useEffect } from 'react'
import { Button, Input, Modal, notification, Typography } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as R from 'ramda'
import { withRouter } from 'react-router-dom'

import { MainLayout } from '../../components/layouts'
import { CustomEditor, CustomImageCrop } from '../../components'
import {
  IAccountDomain,
  IBlogFormUi,
  IDispatchable,
  IMyBlogsDomain,
} from '../../models'

import './styles.scss'
import { createSelector } from 'reselect'
import {
  getBlogFormIsSuccess,
  getBlogFormUi,
  getBlogFormErrorMessage,
  getDeleteBlogIsSuccess,
} from '../../redux/blog-form/selectors'
import { getAccountDomain } from '../../redux/account/selectors'
import {
  blogFormError,
  changeBlogFormUi,
  createBlog,
  initialBlogFormUiState,
  updateBlog,
  deleteBlog,
} from '../../redux/blog-form/actions'
import { getMyBlogsDomain } from '../../redux/my-blogs/selectors'

interface IBlogFormPageProps extends IDispatchable {
  readonly accountDomain: IAccountDomain
  readonly blogFormUi: IBlogFormUi
  readonly myBlogsDomain: IMyBlogsDomain
  readonly blogFormIsSuccess: boolean
  readonly deleteBlogIsSuccess: boolean
  readonly blogFormErrorMessage: boolean
  readonly deleteBlogErrorMessage: boolean
  readonly location: any
  readonly history: any
}

const BlogFormPage: React.FC<IBlogFormPageProps> = ({
  accountDomain,
  blogFormUi,
  myBlogsDomain,
  blogFormIsSuccess,
  deleteBlogIsSuccess,
  blogFormErrorMessage,
  location,
  history,
  dispatch,
}) => {
  useEffect(() => {
    switch (R.split('/', location.pathname)[1]) {
      case 'create-blog':
        dispatchChangeBlogFormUi({
          blogId: undefined,
          userId: accountDomain.id,
          jwtToken: accountDomain.jwtToken,
          title: '',
          contents: '',
          filePath: '',
          fileName: '',
        })
        break
      case 'update-blog':
        const pickBlog = R.find(
          R.propEq('id', R.split('/', location.pathname)[2])
          // @ts-ignore
        )(myBlogsDomain)

        dispatchChangeBlogFormUi({
          blogId: pickBlog.id,
          userId: accountDomain.id,
          jwtToken: accountDomain.jwtToken,
          title: pickBlog.title,
          contents: pickBlog.contents,
          filePath: pickBlog.filePath,
          fileName: pickBlog.fileName,
        })
        break
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (blogFormIsSuccess) {
      history.push('/my/blog')
      notification['success']({
        message: `블로그 ${
          R.split('/', location.pathname)[1] === 'create-blog' ? '작성' : '수정'
        }이 완료 되었습니다.`,
      })
      dispatchInitialBlogFormUiState()
    }
  }, [blogFormIsSuccess]) // eslint-disable-line

  useEffect(() => {
    if (deleteBlogIsSuccess) {
      history.push('/my/blog')
      notification['success']({
        message: `블로그 삭제가 완료 되었습니다.`,
      })
      dispatchInitialBlogFormUiState()
    }
  }, [deleteBlogIsSuccess]) // eslint-disable-line

  useEffect(() => {
    if (!R.isEmpty(blogFormErrorMessage) && !blogFormIsSuccess) {
      notification['error']({
        message: blogFormErrorMessage,
      })
      dispatchBlogError('')
    }
  }, [blogFormErrorMessage]) // eslint-disable-line

  // dispatcher
  const dispatchChangeBlogFormUi = (data: any) =>
    dispatch(
      changeBlogFormUi({
        ...blogFormUi,
        ...data,
      })
    )
  const dispatchBlog = async () => {
    if (!R.includes('', R.values(R.omit(['blogId'], blogFormUi)))) {
      const okText =
        R.split('/', location.pathname)[1] === 'create-blog' ? '저장' : '수정'
      Modal.confirm({
        title: `글을 ${okText} 하시겠습니까?`,
        okText,
        cancelText: '취소',
        centered: true,
        onOk() {
          R.split('/', location.pathname)[1] === 'create-blog'
            ? dispatch(createBlog())
            : dispatch(updateBlog())
        },
        onCancel() {
          console.log('취소')
        },
      })
    } else {
      notification['warning']({
        message: '모든 내용을 입력해주시기 바랍니다.',
      })
    }
  }
  const dispatchDeleteBlog = () =>
    Modal.confirm({
      title: `글을 삭제 하시겠습니까?`,
      okText: '삭제',
      cancelText: '취소',
      centered: true,
      okType: 'danger',
      onOk() {
        dispatch(deleteBlog(R.split('/', location.pathname)[2]))
      },
      onCancel() {
        console.log('취소')
      },
    })

  const dispatchBlogError = (message: string) =>
    dispatch(blogFormError(message))
  const dispatchInitialBlogFormUiState = () =>
    dispatch(initialBlogFormUiState())

  return (
    <MainLayout>
      <div className="create-blog-page-wrapper">
        <Typography.Title level={2}>
          블로그{' '}
          {R.split('/', location.pathname)[1] === 'create-blog'
            ? '작성'
            : '수정'}
        </Typography.Title>
        <br />
        <br />
        <Typography.Title level={4}>제목</Typography.Title>
        <Input
          className="create-blog-page-title-input"
          placeholder="제목을 입력해주세요."
          allowClear
          value={blogFormUi.title}
          onChange={(e: any) =>
            dispatchChangeBlogFormUi({ title: e.target.value })
          }
        />
        <br />
        <br />
        <Typography.Title level={4}>내용</Typography.Title>
        {/*
        // @ts-ignore */}
        <CustomEditor
          dispatchSetState={dispatchChangeBlogFormUi}
          initialContents={
            R.split('/', location.pathname)[1] === 'create-blog'
              ? ''
              : R.find(
                  R.propEq('id', R.split('/', location.pathname)[2])
                  // @ts-ignore
                )(myBlogsDomain).contents
          }
        />
        <br />
        <br />
        <Typography.Title level={4}>이미지</Typography.Title>
        {/*
        // @ts-ignore */}
        <CustomImageCrop
          accountDomain={accountDomain}
          state={blogFormUi}
          dispatchSetState={dispatchChangeBlogFormUi}
          aspectRatio={13 / 7}
        />
        <Button
          className="create-blog-page-submit"
          type="primary"
          onClick={dispatchBlog}
        >
          {R.split('/', location.pathname)[1] === 'create-blog'
            ? '작성 완료'
            : '수정 완료'}
        </Button>
        {R.split('/', location.pathname)[1] === 'update-blog' && (
          <Button
            className="create-blog-page-submit"
            type="danger"
            onClick={dispatchDeleteBlog}
          >
            삭제 하기
          </Button>
        )}
      </div>
    </MainLayout>
  )
}

const mapStateToProps = createSelector(
  getAccountDomain(),
  getBlogFormUi(),
  getMyBlogsDomain(),
  getBlogFormIsSuccess(),
  getDeleteBlogIsSuccess(),
  getBlogFormErrorMessage(),
  (
    accountDomain,
    blogFormUi,
    myBlogsDomain,
    blogFormIsSuccess,
    deleteBlogIsSuccess,
    blogFormErrorMessage
  ) => ({
    accountDomain,
    blogFormUi,
    myBlogsDomain,
    blogFormIsSuccess,
    deleteBlogIsSuccess,
    blogFormErrorMessage,
  })
)

const withConnect = connect(mapStateToProps)

export default compose<IBlogFormPageProps, IBlogFormPageProps>(withConnect)(
  // @ts-ignore
  compose<IBlogFormPageProps, IBlogFormPageProps>(withRouter)(BlogFormPage)
)
