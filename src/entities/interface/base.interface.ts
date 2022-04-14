import { uuidv4 } from '@/shared/utils/uuid'
import { InterfaceType } from '@nestjs/graphql'
import { Expose, plainToInstance } from 'class-transformer'
import { Column, CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IResource } from './resource.interface'

type ParentItself = IBase<ParentItself>

// @InterfaceType({
//   // workaround for bug: https://github.com/MichalLytek/type-graphql/issues/373
//   resolveType: value => value.constructor.name,
// })
export abstract class IBase<T extends IBase<T> = ParentItself> implements IResource {

  @Expose()
  @PrimaryGeneratedColumn('uuid')
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
   @Column({nullable: true, default: false})
   isDelete?: boolean

  /**
   * 
   * @param plainInstance 字面量对象
   */
  constructor(plainInstance: Partial<T>) {
    if (plainInstance) {

      this.id = this.id || uuidv4()
      this.createdAt = this.createdAt || new Date()
      this.updatedAt = new Date()
      this.isDelete = this.isDelete || false
    }
  }
}
