import {
  Authorized,
  BadRequestError,
  Body,
  Delete,
  Get,
  InternalServerError,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  QueryParam,
  Res,
  UseBefore,
} from 'routing-controllers'
import { Response } from 'express'

import { LoggingMiddleware } from '../../../middleware/http_logging.middleware'
import { CreateBlogDTO, UpdateBlogDTO } from './blog.dto'
import {
  ApiResponse,
  HTTP_STATUS_CODE,
} from '../../../handlers/api_response.handler'
import { BlogService } from './blog.service'

@JsonController('/v1/blogs/')
@UseBefore(LoggingMiddleware)
export class BlogController {
  constructor(private blogService: BlogService) {}

  /**
   * GET select Blogs(Public)
   * @param response - Response Object
   * @param page - page string
   * @param search - search string
   * @returns blogs
   */
  @Get('public')
  public async selectBlogsForPublic(
    @Res() response: Response,
    @QueryParam('page') page: number,
    @QueryParam('search') search: string
  ): Promise<Response> {
    const blogs = await this.blogService.selectBlogsForPublic(page, search)

    return new ApiResponse(response)
      .withData(blogs)
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }

  /**
   * GET select Blog(Public)
   * @param response - Response Object
   * @param blogId - blogId string
   * @returns blog
   */
  @Get(':blogId/public')
  public async selectBlogForPublic(
    @Res() response: Response,
    @Param('blogId') blogId: string
  ): Promise<Response> {
    if (!blogId) throw new BadRequestError('올바른 요청이 아닙니다.')

    const blog = await this.blogService.selectBlogByIdForPublic(blogId)

    return new ApiResponse(response)
      .withData(blog)
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }

  /**
   * GET select Blog by user id
   * @param response - Response object
   * @param userId - userId string
   * @param page - page string
   * @param search - search string
   * @returns blog[]
   */
  @Get('users/:userId')
  @Authorized()
  public async selectBlogsByUserId(
    @Res() response: Response,
    @Param('userId') userId: string,
    @QueryParam('page') page: number,
    @QueryParam('search') search: string
  ): Promise<Response> {
    if (!userId) throw new BadRequestError('올바른 요청이 아닙니다.')

    const blog = await this.blogService.selectBlogsByUserId(
      userId,
      page,
      search
    )

    return new ApiResponse(response)
      .withData(blog)
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }

  /**
   * POST create new blog
   * @param response - Response object
   * @param createBlogDto - CreateBlogDTO object
   * @returns new blog
   */
  @Post()
  @Authorized()
  public async createBlog(
    @Res() response: Response,
    @Body({ required: true }) createBlogDto: CreateBlogDTO
  ): Promise<Response> {
    const blog = await this.blogService.createBlog(createBlogDto)

    return await new ApiResponse(response)
      .withData(blog)
      .withStatusCode(HTTP_STATUS_CODE.CREATED)
      .build()
  }

  /**
   * PUT update blog
   * @param response - Response object
   * @param blogId - blogId string
   * @param updateBlogDto - UpdateBlogDTO object
   * @returns new blog
   */
  @Put(':blogId')
  @Authorized()
  public async updateBlog(
    @Res() response: Response,
    @Param('blogId') blogId: string,
    @Body({ required: true }) updateBlogDto: UpdateBlogDTO
  ): Promise<Response> {
    if (!blogId) throw new BadRequestError('올바른 요청이 아닙니다.')

    const blogDB = await this.blogService.selectBlogByIdForPublic(blogId)
    if (!blogDB) throw new NotFoundError('존재하지 않는 블로그 입니다.')

    const blog = await this.blogService.updateBlogByBlogId(
      blogId,
      updateBlogDto
    )

    return await new ApiResponse(response)
      .withData(blog)
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }

  /**
   * DELETE delete blog
   * @param response - Response object
   * @param blogId - blogId string
   * @returns Delete result
   */
  @Delete(':blogId')
  @Authorized()
  public async deleteUserById(
    @Res() response: Response,
    @Param('blogId') blogId: string
  ): Promise<Response> {
    if (!blogId) throw new BadRequestError('올바른 요청이 아닙니다.')

    const blogDB = await this.blogService.selectBlogByIdForPublic(blogId)
    if (!blogDB) throw new NotFoundError('존재하지 않는 블로그 입니다.')

    const result = await this.blogService.deleteBlogById(blogId)
    if (!result)
      throw new InternalServerError('블로그 삭제를 완료하지 못했습니다.')

    return new ApiResponse(response)
      .withData('블로그 삭제를 완료하였습니다.')
      .withStatusCode(HTTP_STATUS_CODE.OK)
      .build()
  }
}
