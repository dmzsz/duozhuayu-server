import { Image } from '@/entities'
import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { ClothingFlawImage } from './clothing-flaw-image.type'
import { Clothing } from './clothing.type'
import { ElectronicsFlawImage } from './electronics-flaw-image.type'
import { Electronics } from './electronics.type'
import { ProductFlaw } from './product-flaw.type'

/**
 * 电子产品缺陷
 */
@ObjectType()
export class ElectronicsFlaw extends ProductFlaw {

    @Expose()
    @Type(() => Electronics)
    @Field(() => Electronics)
    electronics: Electronics

    @Expose()
    @Type(() => ElectronicsFlawImage)
    @Field(() => [ElectronicsFlawImage])
    images?: ElectronicsFlawImage[] = null

    constructor(electronicsFlaw: Partial<ElectronicsFlaw>) {
        super(electronicsFlaw)

        if (electronicsFlaw) {
            Object.assign(
                this,
                plainToInstance(ElectronicsFlaw, electronicsFlaw, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}