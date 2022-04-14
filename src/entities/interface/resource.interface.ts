
import { Expose, Type } from 'class-transformer'
import { Column, PrimaryColumn } from 'typeorm'

export abstract class IResource {

  @Expose()
  @PrimaryColumn()
  id?: string


  @Expose()
  @Column()
  createdAt?: Date

  @Expose()
  @Column()
  updatedAt?: Date
}
