import {
  Expose,
} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

import { randomId } from '@/shared/utils/uuid'
import { IResource } from './resource.interface'

type ParentItself = IBase<ParentItself>

// @InterfaceType({
//   // workaround for bug: https://github.com/MichalLytek/type-graphql/issues/373
//   resolveType: value => value.constructor.name,
// })
export abstract class IBase<T extends IBase<T> = ParentItself> implements IResource {

  @Expose()
  @PrimaryColumn({ type: 'bigint' })
  id?: string

  @Expose()
  @CreateDateColumn()
  @Column('timestamp', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt?: Date

  @Expose()
  @UpdateDateColumn()
  @Column('timestamp', { nullable: true, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt?: Date

  /**
   * 是否删除
   */
  @Expose()
  @Column({ nullable: true, default: false, name: 'is_delete' })
  isDelete?: boolean = false

  /**
   * 
   * @param plainInstance 字面量对象
   */
  constructor(plainInstance: Partial<T>) {
    if (plainInstance) {

      this.id = plainInstance.id || randomId()
      this.createdAt = plainInstance.createdAt || new Date()
      this.updatedAt = new Date()
      this.isDelete = plainInstance.isDelete || false

      Object.assign(plainInstance, this)
    }
  }
}
