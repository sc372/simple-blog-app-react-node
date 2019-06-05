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
import { BlogCommentCommentService } from './blog-comment-comment.service'
import {
  CreateBlogCommentCommentDTO,
  UpdateBlogCommentCommentDTO,
} from './blog-comment-comment.dto'

@JsonController('/v1/blog-comment-comments/')
@UseBefore(LoggingMiddleware)
export class BlogCommentCommentController {
  constructor(private blogCommentCommentService: BlogCommentCommentService) {}

  /**
   * Post create blog-comment-comment
   * @param response - Response object
   * @param createBlogCommentCommentDto - CreateBlogCommentCommentDTO object
   */
  @Post()
  @Authorized()
  public async updateBlogCommentComment(
    @Res() response: Response,
    @Body() createBlogCommentCommentDto: CreateBlogCommentCommentDTO
  ): Promise<Response> {
    const blogCommentComment = await this.blogCommentCommentService.createBlogCommentComment(
      createBlogCommentCommentDto
    )

    return await new ApiResponse(response)
      .withData(blogCommentComment)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * Put create blog-comment-comment
   * @param response - Response object
   * @param updateBlogCommentCommentDto - UpdateBlogCommentCommentDTO object
   */
  @Put()
  @Authorized()
  public async createBlogCommentComment(
    @Res() response: Response,
    @Body() updateBlogCommentCommentDto: UpdateBlogCommentCommentDTO
  ): Promise<Response> {
    const blogCommentComment = await this.blogCommentCommentService.updateBlogCommentComment(
      updateBlogCommentCommentDto
    )
    console.log('Line: 68', blogCommentComment)

    return await new ApiResponse(response)
      .withData(blogCommentComment)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * Delete create blog-comment-comment
   * @param response - Response object
   * @param blogCommentCommentId - blogCommentCommentId string
   */
  @Delete(':blogCommentCommentId')
  @Authorized()
  public async deleteBlogCommentComment(
    @Res() response: Response,
    @Param('blogCommentCommentId') blogCommentCommentId: string
  ): Promise<Response> {
    if (!blogCommentCommentId)
      throw new BadRequestError('올바른 요청이 아닙니다.')

    const blogCommentCommentDB = await this.blogCommentCommentService.selectBlogCommentCommentByIdForPublic(
      blogCommentCommentId
    )
    if (!blogCommentCommentDB)
      throw new NotFoundError('존재하지 않는 댓글 입니다.')

    const result = await this.blogCommentCommentService.deleteBlogCommentCommentById(
      blogCommentCommentId
    )
    if (!result)
      throw new InternalServerError('댓글 삭제를 완료하지 못했습니다.')

    return new ApiResponse(response)
      .withData('댓글 삭제를 완료하였습니다.')
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }
}
