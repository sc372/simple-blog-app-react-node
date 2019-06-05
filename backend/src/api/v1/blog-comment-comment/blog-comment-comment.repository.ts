import { EntityRepository, Repository } from 'typeorm'
import { Service } from 'typedi'

import { BlogCommentComment } from './blog-comment-comment.model'

@Service()
@EntityRepository(BlogCommentComment)
export class BlogCommentCommentRepository extends Repository<
  BlogCommentComment
> {}
