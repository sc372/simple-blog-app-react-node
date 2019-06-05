import { EntityRepository, Repository } from 'typeorm'
import { Service } from 'typedi'

import { Blog } from './blog.model'

@Service()
@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {}
