import { Modal } from 'antd'

export const confirmDeleteBlog = (dispatchFn: any) =>
  Modal.confirm({
    title: `글을 삭제 하시겠습니까?`,
    okText: '삭제',
    cancelText: '취소',
    centered: true,
    okType: 'danger',
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmCreateComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글 작성',
    content: '댓글을 작성하시겠습니까?',
    okText: '작성',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmUpdateComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글 수정',
    content: '댓글을 수정하시겠습니까?',
    okText: '수정',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmDeleteComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글 삭제',
    content: '댓글을 삭제하시겠습니까?(댓글의 댓글은 모두 삭제됩니다.)',
    okText: '삭제',
    cancelText: '취소',
    centered: true,
    okType: 'danger',
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmCreateCommentComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글의 댓글 작성',
    content: '댓글의 댓글을 작성하시겠습니까?',
    okText: '작성',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmUpdateCommentComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글의 댓글 수정',
    content: '댓글의 댓글을 수정하시겠습니까?',
    okText: '수정',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmDeleteCommentComment = (dispatchFn: any) =>
  Modal.confirm({
    title: '댓글의 댓글 삭제',
    content: '댓글의 댓글을 삭제하시겠습니까?',
    okText: '삭제',
    cancelText: '취소',
    centered: true,
    okType: 'danger',
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmUpdateAccount = (dispatchFn: any) =>
  Modal.confirm({
    title: '회원 정보를 수정하시겠습니까?',
    okText: '수정',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmCreateBlog = (dispatchFn: any) =>
  Modal.confirm({
    title: `블로그를 작성 하시겠습니까?`,
    okText: '작성',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })

export const confirmUpdateBlog = (dispatchFn: any) =>
  Modal.confirm({
    title: `블로그를 수정 하시겠습니까?`,
    okText: '수정',
    cancelText: '취소',
    centered: true,
    onOk() {
      dispatchFn()
    },
    onCancel() {
      console.log('취소')
    },
  })
