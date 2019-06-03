import { Axios, AxiosWithJwt } from '../utils/http'

export interface IPostSignInApi {
  readonly email: string
  readonly password: string
  readonly isAutoLogin: boolean
}

export interface IPostSignInWithJwtApi {
  readonly jwtToken: any
}

export const postSignInApi = (data: IPostSignInApi) =>
  Axios()
    .post('v1/auth/sign-in', {
      email: data.email,
      password: data.password,
      isAutoLogin: data.isAutoLogin,
    })
    .then(res => res)
    .catch(err => err.response)

export const postSignInWithJwtApi = (data: IPostSignInWithJwtApi) =>
  AxiosWithJwt(data.jwtToken)
    .post('v1/auth/sign-in/auto')
    .then(res => res)
    .catch(err => err.response)
