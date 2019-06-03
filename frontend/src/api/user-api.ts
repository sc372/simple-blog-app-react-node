import { Axios, AxiosWithJwt } from '../utils/http'

export interface IPutUpdateUserApi {
  readonly id: string
  readonly email: string
  readonly nickname: string
  readonly filePath: string
  readonly fileName: string
  readonly jwtToken: string
}

export interface IPostSignUpApi {
  readonly email: string
  readonly password: string
  readonly rePassword: string
  readonly nickname: string
}

export const putUpdateUserApi = (data: IPutUpdateUserApi) =>
  AxiosWithJwt(data.jwtToken)
    .put(`v1/users/${data.id}`, {
      email: data.email,
      nickname: data.nickname,
      filePath: data.filePath,
      fileName: data.fileName,
    })
    .then(res => res)
    .catch(err => err.response)

export const postSignUpApi = (data: IPostSignUpApi) =>
  Axios()
    .post('v1/users', {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
    .then(res => res)
    .catch(err => err.response)
