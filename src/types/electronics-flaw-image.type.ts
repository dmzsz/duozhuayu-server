import { Field, ObjectType } from '@nestjs/graphql'
import { Image } from './image.type'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { FlawImageType } from '@/shared/enums'
import { ElectronicsFlaw } from './electronics-flaw.type'
import { IsEnum } from 'class-validator'

@ObjectType()
export class ElectronicsFlawImage extends Image {

    @Expose()
    @Type(() => ElectronicsFlaw)
    @Field(() => ElectronicsFlaw)
    electronicsFlaw: ElectronicsFlaw

    @Expose()
    @Field(() => FlawImageType)
    @IsEnum(FlawImageType)
    type: FlawImageType

    constructor(image: Partial<ElectronicsFlawImage>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(ElectronicsFlawImage, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}