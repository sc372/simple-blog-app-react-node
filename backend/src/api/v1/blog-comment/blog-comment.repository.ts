import { EntityRepository, Repository } from 'typeorm'
import { Service } from 'typedi'

import { BlogComment } from './blog-comment.model'

@Service()
@EntityRepository(BlogComment)
export class BlogCommentRepository extends Repository<BlogComment> {}
