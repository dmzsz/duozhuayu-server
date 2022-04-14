import { uuidv4 } from '@/shared/utils/uuid'
import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { Expose } from 'class-transformer'
import { IResource } from './resource.interface'

type ParentItself = IBase<ParentItself>

@InterfaceType({
  // workaround for bug: https://github.com/MichalLytek/type-graphql/issues/373
  resolveType: value => value.constructor.name,
  implements: () => [IResource],
})
export abstract class IBase<T extends IBase<T> = ParentItself> implements IResource {

  /**
   * id
   */
  @Expose()
  @Field(type => ID)
  id: string

  /**
   * 创建时间
   */
  @Expose()
  @Field()
  createdAt: Date

  /**
   * 更新时间
   */
  @Expose()
  @Field()
  updatedAt: Date

  /**
   * 是否删除
   */
  @Expose()
  @Field()
  isDelete: boolean = false

  /**
   * 
   * @param plainInstance 字面量对象
   */
  constructor(plainInstance: Partial<T>) {
    if (plainInstance) {

      this.id = this.id || uuidv4()
      this.createdAt = this.createdAt || new Date()
      this.updatedAt = new Date()
      this.isDelete = false
    }
  }

}