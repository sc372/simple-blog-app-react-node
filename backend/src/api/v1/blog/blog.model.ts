import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CUI } from '../common/CUI'
import { User } from '../user/user.model'
import { BlogComment } from '../blog-comment/blog-comment.model'

@Entity('tb_blogs')
export class Blog extends CUI {
  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  contents: string

  @Column({ nullable: true, name: 'file_path' })
  filePath: string

  @Column({ nullable: true, name: 'file_name' })
  fileName: string

  @ManyToOne(() => User, user => user.blog)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => BlogComment, blogComment => blogComment.blog)
  blogComments: BlogComment[]
}
