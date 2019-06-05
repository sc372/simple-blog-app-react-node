import { Service } from 'typedi'
import { DeleteResult, Like, Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'

import { Logger, LoggerService } from '../../../logger/logger.service'
import { Blog } from './blog.model'
import { UserService } from '../user/user.service'
import { CreateBlogDTO, UpdateBlogDTO } from './blog.dto'
import { BlogRepository } from './blog.repository'
import { User } from '../user/user.model'

@Service()
export class BlogService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    private userService: UserService,
    @InjectRepository(Blog)
    private blogRepository: BlogRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Create a new blog
   * @param createBlogDto - request create Blog Object
   * @returns new blog
   */
  public async createBlog(createBlogDto: CreateBlogDTO): Promise<Blog | any> {
    const userDB = await this.userRepository.findOne({
      id: createBlogDto.userId,
    })

    const _blog = new Blog()
    _blog.title = createBlogDto.title
    _blog.contents = createBlogDto.contents
    _blog.filePath = createBlogDto.filePath
    _blog.fileName = createBlogDto.fileName
    _blog.user = userDB

    return await this.blogRepository.save(_blog)
  }

  /**
   * Update a blog by blog id
   * @param blogId - blogId string
   * @param updateBlogDto - updateBlogDTO Object
   * @returns new blog
   */
  public async updateBlogByBlogId(
    blogId: string,
    updateBlogDto: UpdateBlogDTO
  ): Promise<Blog | any> {
    const _blog = new Blog()
    _blog.id = blogId
    _blog.title = updateBlogDto.title
    _blog.contents = updateBlogDto.contents
    _blog.filePath = updateBlogDto.filePath
    _blog.fileName = updateBlogDto.fileName

    const blogDB = await this.blogRepository.save(_blog)

    return blogDB
  }

  /**
   * Delete a blog by blog id
   * @param blogId - blogId string
   * @returns DeleteResult object
   */
  public async deleteBlogById(blogId: string): Promise<DeleteResult> {
    const result = await this.blogRepository.delete(blogId)

    return result
  }

  /**
   * Select blog list
   * @param page - page number
   * @param search - search string
   * @returns blog list
   */
  public async selectBlogsForPublic(
    page: number,
    search: string
  ): Promise<[Blog[], number]> {
    const skip = page * 12
    const blogsDB: [Blog[], number] = await this.blogRepository.findAndCount({
      where: { title: Like(`%${search}%`) },
      order: { createdAt: 'DESC' },
      skip: !page ? 0 : skip,
      take: 12,
      relations: [
        'user',
        'blogComments',
        'blogComments.user',
        'blogComments.blogCommentComments',
        'blogComments.blogCommentComments.user',
      ],
    })

    return blogsDB
  }

  /**
   * Select blog list
   * @param blogId - blogId string
   * @returns blog list
   */
  public async selectBlogByIdForPublic(blogId: string): Promise<Blog> {
    const blogDB: Blog = await this.blogRepository.findOne(blogId, {
      relations: [
        'user',
        'blogComments',
        'blogComments.user',
        'blogComments.blogCommentComments',
        'blogComments.blogCommentComments.user',
      ],
    })

    return blogDB
  }

  /**
   * Select blog by userId
   * @param userId - request userId
   * @param page - request page
   * @param search - request search
   * @returns blog list
   */
  public async selectBlogsByUserId(
    userId: string,
    page: number,
    search: string
  ): Promise<[Blog[], number]> {
    const skip = page * 7
    const blogsDB: [Blog[], number] = await this.blogRepository.findAndCount({
      where: { user: userId, title: Like(`%${search}%`) },
      order: { createdAt: 'DESC' },
      skip: !page ? 0 : skip,
      take: 7,
      relations: [
        'blogComments',
        'blogComments.user',
        'blogComments.blogCommentComments',
        'blogComments.blogCommentComments.user',
      ],
    })

    return blogsDB
  }
}
