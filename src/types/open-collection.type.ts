import { IBase } from './interface/base.interface'
import { OpenCollectionImage } from './open-collection-image.type'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { Customer } from './customer.type'
import { CustomerContribute } from './customer-contribute.type'

@ObjectType({
    implements: () => [IBase],
})
export class OpenCollection extends IBase<OpenCollection> {

    /**
     * 提议者
     */
    @Expose()
    @Type(() => Customer)
    @Field(() => Customer)
    proposer?: Customer

    /**
     * 贡献者
     */
    @Expose()
    @Type(() => CustomerContribute)
    @Field(() => [CustomerContribute])
    contributors?: CustomerContribute[]


    /**
     * 推荐图书
     */
    @Expose()
    @Type(() => CustomerContribute)
    @Field(() => [CustomerContribute])
    books: CustomerContribute[]
    
    /**
     * 用户推荐
     */
    @Expose()
    @Field(() => [CustomerContribute])
    customerContributes: CustomerContribute[]

    /**
     * 顶部图片
     */
    @Expose()
    @Type(() => OpenCollectionImage)
    @Field(() => OpenCollectionImage)
    openCollectionImage: OpenCollectionImage

    constructor(image?: Partial<OpenCollectionImage>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(OpenCollectionImage, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}