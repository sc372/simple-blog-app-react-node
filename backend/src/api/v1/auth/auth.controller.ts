import {
  Post,
  UseBefore,
  JsonController,
  Res,
  Body,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  Authorized,
  CurrentUser,
} from 'routing-controllers'
import { Response } from 'express'
import { Validator } from 'class-validator'

import { UserService } from '../user/user.service'
import { LoggingMiddleware } from '../../../middleware/http_logging.middleware'
import { User } from '../user/user.model'
import {
  ApiResponse,
  HTTP_STATUS_CODE,
} from '../../../handlers/api_response.handler'

@JsonController('/v1/auth/')
@UseBefore(LoggingMiddleware)
export class AuthController {
  constructor(private userService: UserService) {}

  /**
   * POST sign-in user with email and password data
   * @param response - Response object
   * @param user - User object
   * @returns SingIn response
   */
  @Post('sign-in')
  public async signIn(
    @Res() response: Response,
    @Body({ required: true }) user: User
  ): Promise<Response> {
    const validator = new Validator()
    if (!validator.isEmail(user.email) || validator.isEmpty(user.email))
      throw new BadRequestError('이메일을 확인해주세요.')

    if (validator.isEmpty(user.password))
      throw new BadRequestError('비밀번호를 확인해주세요.')

    const userDB = await this.userService.selectUserByEmail(user.email)
    if (!userDB) throw new NotFoundError('가입되지 않은 이메일 입니다.')

    const loginResponse = await this.userService.signIn(user)
    if (loginResponse) {
      return new ApiResponse(response)
        .withData(loginResponse)
        .withStatusCode(HTTP_STATUS_CODE.OK)
        .build()
    } else {
      throw new UnauthorizedError('로그인 처리에 실패하였습니다.')
    }
  }

  /**
   * POST sign-in user with jwt token
   * @param response - Response object
   * @param user - Current User object
   * @returns SingInWithJwt response
   */
  @Post('sign-in/auto')
  @Authorized()
  public async loginWithJwt(
    @Res() response: Response,
    @CurrentUser() user: User
  ): Promise<Response> {
    const userDB = await this.userService.selectUserById(user.id)
    const apiResponse = new ApiResponse(response)
    if (!userDB) throw new NotFoundError('존재하지 않는 사용자 입니다.')

    const loginResponse = await this.userService.signInWithJwt(user)
    if (loginResponse) {
      return apiResponse
        .withData(loginResponse)
        .withStatusCode(HTTP_STATUS_CODE.OK)
        .build()
    } else {
      throw new UnauthorizedError('로그인 처리에 실패하였습니다.')
    }
  }
}
