import { Field, ID, InterfaceType } from '@nestjs/graphql'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'


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
