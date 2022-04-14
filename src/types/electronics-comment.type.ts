import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Comment } from './comment.type'
import { Electronics } from './electronics.type'

@ObjectType()
export class ElectronicsComment extends Comment {

    @Expose()
    @Type(() => Electronics)
    @Field(() => Electronics)
    electronics: Electronics

    constructor(comment: Partial<ElectronicsComment>) {
        super(comment)

        if (comment) {
            Object.assign(
                this,
                plainToInstance(ElectronicsComment, comment, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}