import { Entity, ObjectIdColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
// import { uuidv4 } from '@/shared/utils'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { Image } from './image.type'
import { OpenCollection } from './open-collection.type'

@ObjectType()
export class OpenCollectionImage extends Image {

    /**
     * 所属OpenCollection
     */
    @Expose()
    @Type(() => OpenCollection)
    @Field(() => OpenCollection)
    openCollection?: OpenCollection

    constructor(image?: Partial<OpenCollectionImage>) {
        super(image)

        if (image) {
            Object.assign(
                this,
                plainToInstance(OpenCollectionImage, image, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}
