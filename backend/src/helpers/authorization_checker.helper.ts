import {
  Action,
  ForbiddenError,
  NotAcceptableError,
  UnauthorizedError,
} from 'routing-controllers'
import { getCustomRepository } from 'typeorm'
import { Container, Service } from 'typedi'
import { Request, Response } from 'express'
import { Logger, LoggerService } from '../logger/logger.service'
import { JWTService } from '../api/v1/auth/jwt.service'
import { User } from '../api/v1/user/user.model'
import { UserRepository } from '../api/v1/user/user.repository'
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'

@Service()
export class AuthChecker {
  constructor(@Logger(__filename) private logger: LoggerService) {}

  /**
   * Try to refresh JWT token
   * @param token - JWT Token
   * @param request - Request object
   * @param response - Response object
   */
  private tryRefreshToken = async (
    token: string,
    request: Request,
    response: Response
  ): Promise<void> => {
    const jwtService = Container.get(JWTService)
    const decoded = await jwtService.decodeToken(token)
    const exp = moment(decoded.exp * 1000)
    const dif = exp.diff(new Date(), 'days')
    if (dif >= -7) {
      const user: User = decoded['user']
      if (!user) {
        throw new NotAcceptableError('유효하지 않은 토큰 값 입니다.')
      }
      const newToken = await jwtService.refreshToken(token)
      // send the new shiny token
      response.setHeader('X-Auth-Token', newToken)
      // bind token and user id to request object
      request['token'] = newToken
      request['user'] = user
    } else {
      throw new ForbiddenError(
        '토큰 유효기간이 만료 되었습니다. 로그인을 다시 시도해주세요.'
      )
    }
  }

  /**
   * Check JWT Token, here we check if request has a valid JWT token and we renew it if is still valid
   * @param request - Request object
   * @param response - Response object
   */
  private checkToken = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    // get auth header from request
    const authorizationHeader = request.get('authorization')
    if (authorizationHeader == null) {
      throw new UnauthorizedError('접근할 수 있는 권한이 없습니다.')
    }
    // an AUTH header looks like 'SCHEMA XXX, so we should split it'
    const tokenParts = authorizationHeader.split(' ')
    // validate length of the array with token
    if (tokenParts.length < 1) {
      throw new NotAcceptableError('유효하지 않은 토큰값입니다.')
    }
    const schema = tokenParts[0] // should be "Bearer"
    const token = tokenParts[1]
    // bind token to request object
    request['token'] = token
    // test Regex for valid JWT token
    if (/[A-Za-z0-9\-._~+\/]+=*/.test(token) && /[Bb]earer/.test(schema)) {
      try {
        const jwtService = Container.get(JWTService)
        const jwtTokenDecoded = await jwtService.verifyToken(token)

        request['user'] = jwtTokenDecoded['user']
      } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
          // Refresh token logic
          await this.tryRefreshToken(token, request, response)
        } else if (error instanceof jwt.JsonWebTokenError) {
          throw new NotAcceptableError('유효하지 않은 토큰, ' + error.message)
        } else {
          throw new NotAcceptableError('유효하지 않은 토큰 입니다.')
        }
      }
    } else {
      // bad code format, should not happen
      throw new NotAcceptableError(
        '인증요청 포맷이 올바르지 않습니다. (요구사항) Authorization: Bearer XXX'
      )
    }
  }

  /**
   * Checks if user is authorized to access route
   *
   * TODO: Refactor this function
   *
   * @param action - Action object from routing controllers
   * @returns Authorization result
   */
  public authorizationChecker = async (action: Action): Promise<boolean> => {
    const request: Request = action.request
    const response: Response = action.response
    // first we verify the JWT token
    await this.checkToken(request, response)
    // user param should now be available
    const user: User = request['user']
    // check if user exists in database
    const userRepository = getCustomRepository(UserRepository)
    const userExists = await userRepository.count({ id: user.id })
    if (!userExists) {
      throw new ForbiddenError('사용자가 존재하지 않습니다.')
    }
    return true
  }
}
