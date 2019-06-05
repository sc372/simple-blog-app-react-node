import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * Abstract class for Created, updated and Deleted at columns with ID field
 */
export abstract class CUI {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date
}
