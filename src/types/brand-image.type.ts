import { IBase } from './interface/base.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { Image } from './image.type'
import { Brand } from './brand.type';
import { ImageType } from '@/shared/enums';

@ObjectType()
export class BrandImage extends Image {
    @Expose()
    @Type(() => Brand)
    @Field(() => Brand)
    brand: Brand

    /**
     * 封皮 书背面 插图 详情介绍 商标
     */
    @Expose()
    @Field(() => ImageType, { nullable: true, defaultValue: ImageType.BRAND})
    type: ImageType.BRAND

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