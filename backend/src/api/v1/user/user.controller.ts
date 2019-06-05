import {
  Body,
  Delete,
  Post,
  Res,
  UseBefore,
  JsonController,
  Param,
  NotFoundError,
  BadRequestError,
  InternalServerError,
  Authorized,
  Put,
} from 'routing-controllers'
import { Response } from 'express'
import { Validator } from 'class-validator'

import { LoggingMiddleware } from '../../../middleware/http_logging.middleware'
import { UserService } from './user.service'
import {
  ApiResponse,
  HTTP_STATUS_CODE,
} from '../../../handlers/api_response.handler'
import { CreateUserDTO, UpdateUserDTO } from './user.dto'

@JsonController('/v1/users/')
@UseBefore(LoggingMiddleware)
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * POST create a new user
   * @param response - Response object
   * @param createUserDTO - CreateUserDTO object from body
   * @returns Created user data
   */
  @Post()
  public async createUser(
    @Res() response: Response,
    @Body({ required: true }) createUserDTO: CreateUserDTO
  ): Promise<Response> {
    const validator = new Validator()
    if (
      !validator.isEmail(createUserDTO.email) ||
      validator.isEmpty(createUserDTO.email)
    )
      throw new BadRequestError('이메일을 확인해주세요.')

    if (validator.isEmpty(createUserDTO.password))
      throw new BadRequestError('비밀번호를 확인해주세요.')

    if (
      createUserDTO.password !== undefined &&
      validator.isEmpty(createUserDTO.password)
    )
      throw new BadRequestError('비밀번호를 확인해주세요.')

    if (
      !/^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{6,12}$/.test(
        createUserDTO.password
      )
    )
      throw new BadRequestError(
        '비밀번호는 숫자, 문자, 특수문자 포함 6~12자리를 입력해주세요.'
      )

    const userExists = await this.userService.userExistsByEmail(
      createUserDTO.email
    )
    if (userExists)
      throw new BadRequestError('이미 가입되어 있는 사용자 입니다.')

    const result = await this.userService.createUser(createUserDTO)

    return new ApiResponse(response)
      .withData(result)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * Update user with id
   * @param response - Response object
   * @param userId - userId string
   * @param updateUserDto - UpdateUserDTO object from body
   * @returns Update result
   */
  @Put(':userId')
  @Authorized()
  public async updateUserById(
    @Res() response: Response,
    @Param('userId') userId: string,
    @Body({ required: true }) updateUserDto: UpdateUserDTO
  ): Promise<Response> {
    if (!userId) throw new BadRequestError('유효하지 않는 요청입니다.')
    const userDB = await this.userService.selectUserById(userId)
    if (!userDB) throw new NotFoundError('사용자를 찾을 수 없습니다.')

    const result = await this.userService.updateUser(userId, updateUserDto)

    return new ApiResponse(response)
      .withData(result)
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }

  /**
   * Delete user with id
   * @param response - Response object
   * @param userId - userId string
   * @returns Delete result
   */
  @Delete(':userId')
  @Authorized()
  public async deleteUserById(
    @Res() response: Response,
    @Param('userId') userId: string
  ): Promise<Response> {
    if (!userId) {
      throw new BadRequestError('유효하지 않는 요청입니다.')
    }
    const userDB = await this.userService.selectUserById(userId)
    if (!userDB) throw new NotFoundError('사용자를 찾을 수 없습니다.')
    const result = await this.userService.deleteUserById(userId)
    if (!result) throw new InternalServerError('사용자를 삭제하지 못했습니다.')

    return new ApiResponse(response)
      .withData('사용자 삭제를 완료하였습니다.')
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }
}
