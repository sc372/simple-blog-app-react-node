import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '../user/user.model'

@Entity('tb_tokens')
export class JwtToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  token: string

  @CreateDateColumn({ nullable: false, name: 'issued_at' })
  issuedAt: Date

  @UpdateDateColumn({ nullable: false, name: 'last_time_refreshed' })
  lastTimeRefreshed: Date

  @Column({ nullable: false })
  agent: string

  @ManyToOne(() => User, user => user.token, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User
}
