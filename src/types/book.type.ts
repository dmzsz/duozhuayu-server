import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { BookCategory } from './book-category.type'
import { BookComment } from './book-comment.type'
import { Image } from './image.type'
import { Producer } from './producer.type'
import { ProductFlaw } from './product-flaw.type'
import { Product } from './product.type'

@ObjectType()
export class Book extends Product {

    @Expose()
    @Type(() => BookCategory)
    @Field(() => BookCategory)
    bookCategory: BookCategory

    /**
     * 出品方
    */
    @Expose()
    @Type(() => Producer)
    @Field(() => Producer)
    producer: Producer

    @Expose()
    @Type(() => BookComment)
    @Field(() => BookComment)
    comment: BookComment

    @Expose()
    @Field()
    title: string

    @Expose()
    @Field({ nullable: true })
    subTitle: string

    @Expose()
    @Field({ nullable: true })
    originalTitle: string

    @Expose()
    @Field({ nullable: true })
    author: string

    @Expose()
    @Field()
    currencyCode: string

    @Expose()
    @Field()
    currencySymbol: string

    @Expose()
    @Field()
    description: string

    @Expose()
    @Field()
    doubanRating: number

    @Expose()
    @Field()
    goodreadsRating: number

    @Expose()
    @Field()
    isbn13: string

    @Expose()
    @Field()
    language: string

    @Expose()
    @Field()
    latestPutawayTime: Date

    @Expose()
    @Field()
    publishDate: Date

    @Expose()
    @Field()
    publisher: string


    constructor(book: Partial<Book>) {
        super(book)

        if (book) {
            Object.assign(
                this,
                plainToInstance(Book, book, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}