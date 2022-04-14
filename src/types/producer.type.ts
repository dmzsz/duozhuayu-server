import { Exclude, Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { IBase } from './interface/base.interface'

/**
 * 出版社
 */
@ObjectType({
    implements: () => [IBase],
})
export class Producer extends IBase<Producer> {
    
    // @Expose()
    // @Type(() => Product)
    // @Field(() => [Product])
    // @OneToMany(() => Product, product => product.producer)
    // books: Product[]

    /**
     * 总出品书数量
     */
    @Expose()
    @Field()
    booksCount: number

    @Expose()
    @Field()
    description: string

    @Expose()
    @Field()
    name: string

    /**
     * logo
     */
    @Expose()
    @Field()
    image: string

    /**
     * 背景主题色
     */
    @Expose()
    @Field()
    maskColor: string


    // tagType: TagType

    constructor(producer: Partial<Producer>) {
        super(producer)

        if (producer) {
            Object.assign(
                this,
                plainToInstance(Producer, producer, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}