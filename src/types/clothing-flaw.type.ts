import { Image } from '@/entities'
import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { ClothingFlawImage } from './clothing-flaw-image.type'
import { Clothing } from './clothing.type'
import { ProductFlaw } from './product-flaw.type'

/**
 * 衣服大小 xl l
 */
@ObjectType()
export class ClothingFlaw extends ProductFlaw {

    @Expose()
    @Type(() => Clothing)
    @Field(() => Clothing)
    clothing: Clothing

    @Expose()
    @Type(() => ClothingFlawImage)
    @Field(() => [ClothingFlawImage])
    images?: ClothingFlawImage[] = null

    constructor(clothingFlaw: Partial<ClothingFlaw>) {
        super(clothingFlaw)

        if (clothingFlaw) {
            Object.assign(
                this,
                plainToInstance(ClothingFlaw, clothingFlaw, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}