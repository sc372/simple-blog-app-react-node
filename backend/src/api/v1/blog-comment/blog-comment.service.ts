import { Logger, LoggerService } from '../../../logger/logger.service'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { DeleteResult, Repository } from 'typeorm'

import { BlogComment } from './blog-comment.model'
import { Blog } from '../blog/blog.model'
import { BlogRepository } from '../blog/blog.repository'
import { User } from '../user/user.model'
import { BlogCommentRepository } from './blog-comment.repository'
import { CreateBlogCommentDTO, UpdateBlogCommentDTO } from './blog-comment.dto'

@Service()
export class BlogCommentService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    @InjectRepository(BlogComment)
    private blogCommentRepository: BlogCommentRepository,
    @InjectRepository(Blog)
    private blogRepository: BlogRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Select blog-comment list
   * @param blogCommentId - blogCommentId string
   * @returns blog-comment
   */
  public async selectBlogCommentByIdForPublic(
    blogCommentId: string
  ): Promise<BlogComment> {
    const blogCommentDB: BlogComment = await this.blogCommentRepository.findOne(
      blogCommentId,
      {
        relations: ['user'],
      }
    )

    return blogCommentDB
  }

  /**
   * Create a new blog-comment
   * @param createBlogCommentDto - CreateBlogCommentDTO object
   * @returns new blog-comment
   */
  public async createBlogComment(
    createBlogCommentDto: CreateBlogCommentDTO
  ): Promise<BlogComment | any> {
    const blogDB = await this.blogRepository.findOne({
      id: createBlogCommentDto.blogId,
    })
    const userDB = await this.userRepository.findOne({
      id: createBlogCommentDto.userId,
    })

    const _blogComment = new BlogComment()
    _blogComment.blog = blogDB
    _blogComment.comment = createBlogCommentDto.comment
    _blogComment.user = userDB

    const _blogCommentDB = await this.blogCommentRepository.save(_blogComment)

    return await this.blogCommentRepository.findOne(_blogCommentDB.id, {
      relations: ['user', 'blogCommentComments', 'blogCommentComments.user'],
    })
  }

  /**
   * Update a new blog-comment
   * @param updateBlogCommentDto - UpdateBlogCommentDTO object
   * @returns new blog-comment
   */
  public async updateBlogComment(
    updateBlogCommentDto: UpdateBlogCommentDTO
  ): Promise<BlogComment | any> {
    const blogCommentDB = await this.blogCommentRepository.findOne({
      id: updateBlogCommentDto.blogCommentId,
    })

    delete blogCommentDB.updatedAt

    blogCommentDB.comment = updateBlogCommentDto.comment

    await this.blogCommentRepository.update(
      updateBlogCommentDto.blogCommentId,
      blogCommentDB
    )

    return await this.blogCommentRepository.findOne(
      updateBlogCommentDto.blogCommentId,
      {
        relations: ['user', 'blogCommentComments', 'blogCommentComments.user'],
      }
    )
  }

  /**
   * Delete a blog-comment by blog-comment id
   * @param blogCommentId - blogCommentId string
   * @returns DeleteResult object
   */
  public async deleteBlogCommentById(
    blogCommentId: string
  ): Promise<DeleteResult> {
    const result = await this.blogCommentRepository.delete(blogCommentId)

    return result
  }
}
