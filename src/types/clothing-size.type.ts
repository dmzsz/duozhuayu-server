import { ClothingInternationalSize, CoatMeasureOption, DressMeasureOption, ShirtMeasureOption, SkirtMeasureOption } from '@/shared/enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToInstance, Type } from 'class-transformer';

/**
 * 衣服大小 xl l
 */
@ObjectType()
export class ClothingSize {

    /**
     * 国内尺寸
     */
    @Expose()
    @Field()
    chineseStandardSize: string

    /**
     * 上衣尺寸
     */
    @Expose()
    @Field(() => ClothingInternationalSize, { nullable: true })
    jacketSize?: ClothingInternationalSize


    /**
     * 裤子尺寸
     */
    @Expose()
    @Field(() => ClothingInternationalSize, { nullable: true })
    pantsSize?: ClothingInternationalSize

    constructor(clothingSize: Partial<ClothingSize>) {

        if (clothingSize) {
            Object.assign(
                this,
                plainToInstance(ClothingSize, clothingSize, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}