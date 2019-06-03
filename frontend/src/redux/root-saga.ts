import { accountSagas } from './account/sagas'
import { authSagas } from './create-user/sagas'
import { updateUserSagas } from './update-user/sagas'

export default [accountSagas, authSagas, updateUserSagas]
