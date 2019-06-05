import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { CUI } from '../common/CUI'
import { User } from '../user/user.model'
import { Blog } from '../blog/blog.model'
import { BlogCommentComment } from '../blog-comment-comment/blog-comment-comment.model'

@Entity('tb_blog_comments')
export class BlogComment extends CUI {
  @Column({ nullable: false })
  comment: string

  @ManyToOne(() => Blog, blog => blog.blogComments, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog

  @ManyToOne(() => User, user => user.blog, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(
    () => BlogCommentComment,
    blogCommentComment => blogCommentComment.blogComment
  )
  blogCommentComments: BlogCommentComment[]
}
