import { Producer, Tag, UserContribute } from '@/entities';
import { Gender } from '@/shared/enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { Image } from './image.type'
import { Product } from './product.type';

/**
 * 衣服面料
 */
@ObjectType()
export class ClothingMaterial {

    /**
     * 材料名称
     */
    @Expose()
    @Field()
    name: string

    /**
     * 百分比
     */
    @Expose()
    @Field()
    percentage: number

    constructor(clothingMaterial: Partial<ClothingMaterial>) {

        if (clothingMaterial) {
            Object.assign(
                this,
                plainToInstance(ClothingMaterial, clothingMaterial, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}