import { IBase } from './interface/base.interface'
import { OpenCollectionImage } from './open-collection-image.type'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.type'
import { UserContribute } from './user-contribute.type'

@ObjectType({
    implements: () => [IBase],
})
export class OpenCollection extends IBase<OpenCollection> {

    /**
     * 提议者
     */
    @Expose()
    @Type(() => User)
    @Field(() => User)
    proposer?: User

    /**
     * 贡献者
     */
    @Expose()
    @Type(() => UserContribute)
    @Field(() => [UserContribute])
    contributors?: UserContribute[]


    /**
     * 推荐图书
     */
    @Expose()
    @Type(() => UserContribute)
    @Field(() => [UserContribute])
    books: UserContribute[]
    
    /**
     * 用户推荐
     */
    @Expose()
    @Field(() => [UserContribute])
    userContributes: UserContribute[]

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