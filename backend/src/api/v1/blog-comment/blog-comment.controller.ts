import {
  Authorized,
  BadRequestError,
  Body,
  Delete,
  InternalServerError,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  Res,
  UseBefore,
} from 'routing-controllers'
import { Response } from 'express'

import { LoggingMiddleware } from '../../../middleware/http_logging.middleware'
import {
  ApiResponse,
  HTTP_STATUS_CODE,
} from '../../../handlers/api_response.handler'
import { BlogCommentService } from './blog-comment.service'
import { CreateBlogCommentDTO, UpdateBlogCommentDTO } from './blog-comment.dto'

@JsonController('/v1/blog-comments/')
@UseBefore(LoggingMiddleware)
export class BlogCommentController {
  constructor(private blogCommentService: BlogCommentService) {}

  /**
   * Post create blog-comment
   * @param response - Response object
   * @param createBlogCommentDto - CreateBlogCommentDTO object
   */
  @Post()
  @Authorized()
  public async createBlogComment(
    @Res() response: Response,
    @Body() createBlogCommentDto: CreateBlogCommentDTO
  ): Promise<Response> {
    const blogComment = await this.blogCommentService.createBlogComment(
      createBlogCommentDto
    )

    return await new ApiResponse(response)
      .withData(blogComment)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * Put create blog-comment
   * @param response - Response object
   * @param updateBlogCommentDto - UpdateBlogCommentDTO object
   */
  @Put()
  @Authorized()
  public async updateBlogComment(
    @Res() response: Response,
    @Body() updateBlogCommentDto: UpdateBlogCommentDTO
  ): Promise<Response> {
    const blogComment = await this.blogCommentService.updateBlogComment(
      updateBlogCommentDto
    )

    return await new ApiResponse(response)
      .withData(blogComment)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * Delete create blog-comment
   * @param response - Response object
   * @param blogCommentId - blogCommentId string
   */
  @Delete(':blogCommentId')
  @Authorized()
  public async deleteBlogComment(
    @Res() response: Response,
    @Param('blogCommentId') blogCommentId: string
  ): Promise<Response> {
    if (!blogCommentId) throw new BadRequestError('올바른 요청이 아닙니다.')

    const blogCommentDB = await this.blogCommentService.selectBlogCommentByIdForPublic(
      blogCommentId
    )
    if (!blogCommentDB) throw new NotFoundError('존재하지 않는 댓글 입니다.')

    const result = await this.blogCommentService.deleteBlogCommentById(
      blogCommentId
    )
    if (!result)
      throw new InternalServerError('댓글 삭제를 완료하지 못했습니다.')

    return new ApiResponse(response)
      .withData('댓글 삭제를 완료하였습니다.')
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }
}
