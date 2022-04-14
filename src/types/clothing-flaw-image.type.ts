import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Image } from './image.type'
import { Expose, plainToInstance, Type } from 'class-transformer';
import { FlawImageType, ImageType } from '@/shared/enums';
import { ProductFlaw } from './product-flaw.type';
import { ClothingFlaw } from './clothing-flaw.type';
  
@ObjectType()
export class ClothingFlawImage extends Image {

    @Expose()
    @Type(() => ClothingFlaw)
    @Field(() => ClothingFlaw)
    clothingFlaw: ClothingFlaw

    @Expose()
    @Field(()=> FlawImageType)
    type: FlawImageType

    constructor(image: Partial<ClothingFlawImage>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(ClothingFlawImage, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}