
import {
  Expose,
  Type,
} from 'class-transformer'
import {
  Column,
  Index,
  PrimaryColumn,
} from 'typeorm'

export abstract class IResource {

  @Expose()
  @PrimaryColumn({ type: 'bigint' })
  id?: string

  @Expose()
  @Column()
  createdAt?: Date

  @Expose()
  @Column()
  updatedAt?: Date
}
