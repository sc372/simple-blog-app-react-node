import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { UnauthorizedError } from 'routing-controllers'
import * as jwt from 'jsonwebtoken'
import * as httpContext from 'express-http-context'

import { JwtToken } from './token.model'
import { TokenRepository } from './token.repository'
import { Logger, LoggerService } from '../../../logger/logger.service'
import { User } from '../user/user.model'

@Service()
export class JWTService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    @InjectRepository(JwtToken)
    private tokenRepository: TokenRepository
  ) {}

  /**
   * Verifies and decode a JWT token
   * @param token - JWT token encoded
   * @returns Token verification
   */
  public async verifyToken(token: string): Promise<object | string> {
    return await jwt.verify(token, process.env.JWT_SECRET)
  }

  /**
   * Decode JWT token without verifying signature
   * @param token - JWT token
   * @returns Decoded token
   */
  public async decodeToken(token: string): Promise<any> {
    return await jwt.decode(token)
  }

  /**
   * Create a JWT token for specified user
   * @param user - User object
   * @param refresh - Should be refresh the token?
   * @returns Promise with the result of the operation
   */
  public async createJWT(user: User, refresh?: boolean): Promise<any> {
    const duration = process.env.NODE_ENV === 'production' ? '30m' : '3d'
    const token = await jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: duration }
    )
    if (!refresh) {
      const userAgent = httpContext.get('useragent')
      const tokenInstance = new JwtToken()
      tokenInstance.token = token
      tokenInstance.agent = userAgent
      tokenInstance.user = user
      this.logger.info(
        `Refreshing user token for user id: ${user.id}, agent: ${userAgent}`
      )
      await this.tokenRepository.save(tokenInstance)
    }
    return token
  }

  /**
   * Deletes all the tokens for user in database
   * @param user - User object
   */
  public async deleteTokens(user: User): Promise<any> {
    await this.tokenRepository.delete({ user })
    this.logger.info(`Deleted tokens for user id: ${user.id}`)
  }

  /**
   * Updates an old JWT token with a new one
   * @param token - Old JWT token
   * @returns The new token
   */
  public async refreshToken(token: string): Promise<any> {
    const tokenDB = await this.tokenRepository.getTokenWithUser(token)
    if (!tokenDB) {
      throw new UnauthorizedError('토큰이 유효하지 않습니다.')
    }
    const newToken = await this.createJWT(tokenDB.user, true)
    this.logger.info(
      `Refreshing user token for user id: ${tokenDB.user.id}, agent: ${
        tokenDB.agent
      }`
    )
    await this.tokenRepository.update(
      { token },
      { token: newToken, lastTimeRefreshed: new Date() }
    )
    return newToken
  }
}
