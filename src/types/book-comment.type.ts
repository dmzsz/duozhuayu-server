import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Book } from './book.type'
import { Comment } from './comment.type'

@ObjectType()
export class BookComment extends Comment {

    @Expose()
    @Type(() => Book)
    @Field(() => Book)
    book: Book

    constructor(comment: Partial<BookComment>) {
        super(comment)

        if (comment) {
            Object.assign(
                this,
                plainToInstance(BookComment, comment, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}