import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

/**
 * Abstract class for Created, updated and Deleted at columns with ID field
 */
export abstract class CUD {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Column('timestamp', { nullable: true, name: 'deleted_at' })
  deletedAt: Date
}
