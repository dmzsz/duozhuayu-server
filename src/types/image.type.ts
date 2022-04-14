import { Entity, ObjectIdColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
// import { uuidv4 } from '@/shared/utils'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { File } from './interface/file.interface'
import { ImageSize } from '@/shared/enums'

@ObjectType({
    implements: () => [File],
})
export class Image extends File {

    @Expose()
    @Field(() => ImageSize)
    size: ImageSize

    /**
     * 封皮 书背面 插图 详情介绍 商标
     */
    // @Expose()
    // @Field(() => ImageType, { nullable: true })
    // type: ImageType

    /**
     * 图片排序, 详情照片一般都有排序的
     */
    @Expose()
    @Field({ nullable: true })
    sortNum?: number

    constructor(image?: Partial<Image>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(Image, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}