import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { User } from './user.model'

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * Get user profile from database
   * @param conditions - Conditions like email = :email
   * @param conditionsValues - Value for conditions ({email: 'bla'})
   * @returns user
   */
  public async selectUser(
    conditions: string,
    conditionsValues: any
  ): Promise<User> {
    return await this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.nickname',
        'user.fileName',
        'user.filePath',
      ])
      .where(conditions, conditionsValues)
      .getOne()
  }
}
