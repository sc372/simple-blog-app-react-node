import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { CUI } from '../common/CUI'
import { User } from '../user/user.model'
import { Blog } from '../blog/blog.model'
import { BlogComment } from '../blog-comment/blog-comment.model'

@Entity('tb_blog_comment_comments')
export class BlogCommentComment extends CUI {
  @Column({ nullable: false })
  comment: string

  @ManyToOne(
    () => BlogComment,
    blogComment => blogComment.blogCommentComments,
    {
      onDelete: 'CASCADE',
      nullable: false,
    }
  )
  @JoinColumn({ name: 'blog_comment_id' })
  blogComment: BlogComment

  @ManyToOne(() => Blog, blog => blog.blogComments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog

  @ManyToOne(() => User, user => user.blogComments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User
}
