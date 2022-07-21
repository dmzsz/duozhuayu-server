import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { PrimaryColumn } from 'typeorm'


@InterfaceType()
export abstract class IResource {

  @Expose()
  @Field(type => ID)
  id: string

  @Expose()
  @Field()
  createdAt: Date
  
  @Expose()
  @Field()
  updatedAt: Date
}
