import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Clothing } from './clothing.type'
import { Comment } from './comment.type'

@ObjectType()
export class ClothingComment extends Comment {

    @Expose()
    @Type(() => Clothing)
    @Field(() => Clothing)
    clothing: Clothing

    constructor(comment: Partial<ClothingComment>) {
        super(comment)

        if (comment) {
            Object.assign(
                this,
                plainToInstance(ClothingComment, comment, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}