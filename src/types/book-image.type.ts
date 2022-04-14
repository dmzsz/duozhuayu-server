import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Image } from './image.type'
import { Book } from './book.type'

@ObjectType()
export class BookImage extends Image {

    /**
     * 出品方
     */
    @Expose()
    @Type(() => Book)
    @Field(() => Book)
    book: Book

    constructor(file: Partial<Image>) {
        super(file)

        if (file) {
            Object.assign(
                this,
                plainToInstance(Image, file, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}