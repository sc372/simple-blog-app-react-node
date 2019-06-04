import { accountSagas } from './account/sagas'
import { createUserSagas } from './create-user/sagas'
import { updateUserSagas } from './update-user/sagas'
import { blogFormSagas } from './blog-form/sagas'
import { myBlogsSagas } from './my-blogs/sagas'
import { blogsSagas } from './blogs/sagas'
import { blogSagas } from './blog/sagas'

export default [
  accountSagas,
  createUserSagas,
  updateUserSagas,
  blogFormSagas,
  myBlogsSagas,
  blogsSagas,
  blogSagas,
]
