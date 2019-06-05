import * as bcrypt from 'bcrypt'
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm'
import { CUI } from '../common/CUI'
import { JwtToken } from '../auth/token.model'
import { Blog } from '../blog/blog.model'
import { BlogComment } from '../blog-comment/blog-comment.model'
import { BlogCommentComment } from '../blog-comment-comment/blog-comment-comment.model'

@Entity('tb_users')
export class User extends CUI {
  @Column({ unique: true, nullable: false })
  nickname: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: true, name: 'file_path' })
  filePath: string

  @Column({ nullable: true, name: 'file_name' })
  fileName: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false, name: 'password_salt' })
  passwordSalt: string

  @UpdateDateColumn({ nullable: true, name: 'last_login' })
  lastLogin: Date

  @OneToMany(() => JwtToken, token => token.user)
  token: JwtToken

  @OneToMany(() => Blog, blog => blog.user)
  blog: Blog

  @OneToMany(() => BlogComment, blogComment => blogComment.user)
  blogComments: BlogComment[]

  @OneToMany(
    () => BlogCommentComment,
    blogCommentComment => blogCommentComment.user
  )
  blogCommentComments: BlogCommentComment[]

  /**
   * Before insertion
   */
  @BeforeInsert()
  async beforeInsertion() {
    // store password as a hash
    await this.updatePassword()
  }

  /**
   * Compare a password with the one encrypted in the database
   * @param passwordToCompare - Password to check against
   * @returns Returns is password is valid
   */
  async comparePassword(passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(passwordToCompare, this.password)
  }

  /**
   * Update password field with a hashed password
   */
  async updatePassword() {
    try {
      this.passwordSalt = bcrypt.genSaltSync(10)
      this.password = bcrypt.hashSync(this.password, this.passwordSalt)
    } catch (error) {
      throw error
    }
  }
}
