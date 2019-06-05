import { Logger, LoggerService } from '../../../logger/logger.service'
import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { DeleteResult, Repository } from 'typeorm'

import { BlogCommentComment } from './blog-comment-comment.model'
import { Blog } from '../blog/blog.model'
import { BlogRepository } from '../blog/blog.repository'
import { User } from '../user/user.model'
import { BlogCommentCommentRepository } from './blog-comment-comment.repository'
import {
  CreateBlogCommentCommentDTO,
  UpdateBlogCommentCommentDTO,
} from './blog-comment-comment.dto'
import { BlogCommentRepository } from '../blog-comment/blog-comment.repository'
import { BlogComment } from '../blog-comment/blog-comment.model'

@Service()
export class BlogCommentCommentService {
  constructor(
    @Logger(__filename) private logger: LoggerService,
    @InjectRepository(BlogCommentComment)
    private blogCommentCommentRepository: BlogCommentCommentRepository,
    @InjectRepository(BlogComment)
    private blogCommentRepository: BlogCommentRepository,
    @InjectRepository(Blog)
    private blogRepository: BlogRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  /**
   * Select blog-comment-comment list
   * @param blogCommentCommentId - blogCommentCommentId string
   * @returns blog-comment-comment
   */
  public async selectBlogCommentCommentByIdForPublic(
    blogCommentCommentId: string
  ): Promise<BlogCommentComment> {
    const blogCommentCommentDB: BlogCommentComment = await this.blogCommentCommentRepository.findOne(
      blogCommentCommentId,
      {
        relations: ['user'],
      }
    )

    return blogCommentCommentDB
  }

  /**
   * Create a new blog-comment-comment
   * @param createBlogCommentCommentDto - CreateBlogCommentCommentDTO object
   * @returns new blog-comment-comment
   */
  public async createBlogCommentComment(
    createBlogCommentCommentDto: CreateBlogCommentCommentDTO
  ): Promise<BlogCommentComment | any> {
    const userDB = await this.userRepository.findOne({
      id: createBlogCommentCommentDto.userId,
    })
    const blogDB = await this.blogRepository.findOne({
      id: createBlogCommentCommentDto.blogId,
    })
    const blogCommentDB = await this.blogCommentRepository.findOne({
      id: createBlogCommentCommentDto.blogCommentId,
    })

    const _blogCommentComment = new BlogCommentComment()
    _blogCommentComment.user = userDB
    _blogCommentComment.blog = blogDB
    _blogCommentComment.blogComment = blogCommentDB
    _blogCommentComment.comment = createBlogCommentCommentDto.comment

    return await this.blogCommentCommentRepository.save(_blogCommentComment)
  }

  /**
   * Update a new blog-comment-comment
   * @param updateBlogCommentCommentDto - UpdateBlogCommentCommentDTO object
   * @returns new blog-comment-comment
   */
  public async updateBlogCommentComment(
    updateBlogCommentCommentDto: UpdateBlogCommentCommentDTO
  ): Promise<BlogCommentComment | any> {
    const _blogCommentCommentDB = await this.blogCommentCommentRepository.findOne(
      {
        id: updateBlogCommentCommentDto.blogCommentCommentId,
      }
    )

    delete _blogCommentCommentDB.updatedAt

    _blogCommentCommentDB.comment = updateBlogCommentCommentDto.comment

    await this.blogCommentCommentRepository.update(
      updateBlogCommentCommentDto.blogCommentCommentId,
      _blogCommentCommentDB
    )

    const blogCommentCommentDB = await this.blogCommentCommentRepository.findOne(
      updateBlogCommentCommentDto.blogCommentCommentId,
      {
        relations: ['user', 'blog', 'blogComment'],
      }
    )

    return blogCommentCommentDB
  }

  /**
   * Delete a blog-comment-comment by blog-comment-comment id
   * @param blogCommentCommentId - blogCommentCommentId string
   * @returns DeleteResult object
   */
  public async deleteBlogCommentCommentById(
    blogCommentCommentId: string
  ): Promise<DeleteResult> {
    const result = await this.blogCommentCommentRepository.delete(
      blogCommentCommentId
    )

    return result
  }
}
