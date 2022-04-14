import { Entity, ObjectIdColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
// import { uuidv4 } from '@/shared/utils'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { Image } from './image.type'
import { ImageSize, ImageType } from '@/shared/enums'
import { Product } from './product.type'
import { OpenCollection } from './open-collection.type'

@ObjectType()
export class FlawImage extends Image {

    /**
     * 所属瑕疵product
     */
    @Expose()
    @Type(() => Product)
    @Field(() => Product)
    flawProduct?: Product

    @Expose()
    @Field(() => ImageSize)
    type: ImageType.FLAW_POSITION | ImageType.FLAW_DETAIL

    /**
     * 图片排序, 详情照片一般都有排序的
     */
    @Expose()
    @Field({ nullable: true })
    override sortNum: number = 1

    constructor(image?: Partial<FlawImage>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(FlawImage, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}