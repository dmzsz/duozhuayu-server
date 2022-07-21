import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToInstance, Type } from 'class-transformer';

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