import { IBase } from './interface/base.interface'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { User } from './user.type'
import { EmailType, ProductType } from '@/shared/enums'
import { Product } from './product.type'

@ObjectType({
    implements: () => [IBase],
})
export class Comment extends IBase<Comment> {

    /**
	 * 评论所属商品
	 */
	@Expose()
	@Type(() => Product)
    @Field(() => Product)
    product?: Product

    @Expose()
    @Field(() => ProductType)
    type: ProductType

    /**
     * 评论所属bookCollection
     */
    // @Expose()
    // @Type(() => Product)
    // @Field(() => Product, { nullable: true })
    // topicBookCollection?: Product

    /**
    * 发送者
    */
    @Expose()
    @Type(() => User)
    @Field(() => User)
    createdUser: User

    @Expose()
    @Type(() => Comment)
    @Field(() => Comment)
    parent: Comment

    @Expose()
    @Type(() => Comment)
    @Field(() => [Comment])
    children: Comment[]

    @Expose()
    @Field()
    isOpened: boolean

    @Expose()
    @Field()
    goodNum: number

    @Expose()
    @Field()
    badNum: number

    constructor(comment?: Partial<Comment>) {
        super(comment)

        if (comment) {
            Object.assign(
                this,
                plainToInstance(Comment, comment, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}