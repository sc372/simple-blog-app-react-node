import { all, takeLatest } from 'redux-saga/effects'

import { selectBlogSaga } from './blog-sagas'
import {
  createBlogCommentSaga,
  deleteBlogCommentSaga,
  updateBlogCommentSaga,
} from './blog-comment-sagas'
import {
  createBlogCommentCommentSaga,
  deleteBlogCommentCommentSaga,
  updateBlogCommentCommentSaga,
} from './blog-comment-comment-sagas'
import {
  CREATE_BLOG_COMMENT,
  CREATE_BLOG_COMMENT_COMMENT,
  DELETE_BLOG_COMMENT,
  DELETE_BLOG_COMMENT_COMMENT,
  SELECT_BLOG,
  UPDATE_BLOG_COMMENT,
  UPDATE_BLOG_COMMENT_COMMENT,
} from '../constants'

export function* blogSagas() {
  yield all([
    takeLatest(SELECT_BLOG, selectBlogSaga),
    takeLatest(CREATE_BLOG_COMMENT, createBlogCommentSaga),
    takeLatest(UPDATE_BLOG_COMMENT, updateBlogCommentSaga),
    takeLatest(DELETE_BLOG_COMMENT, deleteBlogCommentSaga),
    takeLatest(CREATE_BLOG_COMMENT_COMMENT, createBlogCommentCommentSaga),
    takeLatest(UPDATE_BLOG_COMMENT_COMMENT, updateBlogCommentCommentSaga),
    takeLatest(DELETE_BLOG_COMMENT_COMMENT, deleteBlogCommentCommentSaga),
  ])
}
