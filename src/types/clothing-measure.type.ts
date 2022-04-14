import { CoatMeasureOption, DressMeasureOption, ShirtMeasureOption, SkirtMeasureOption } from '@/shared/enums'
import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'

type ClothingMeasureOption = DressMeasureOption | SkirtMeasureOption | ShirtMeasureOption | CoatMeasureOption

/**
 * 衣服尺寸
 */
@ObjectType()
export class ClothingMeasure {

    @Expose()
    @Field()
    name!: ClothingMeasureOption

    @Expose()
    @Field()
    value!: number

    constructor(clothingMeasure: Partial<ClothingMeasure>) {

        if (clothingMeasure) {
            Object.assign(
                this,
                plainToInstance(ClothingMeasure, clothingMeasure, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}