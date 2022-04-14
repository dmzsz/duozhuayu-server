import { Gender } from '@/shared/enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { ClothingComment } from './clothing-comment.type';
import { ClothingFlaw } from './clothing-flaw.type';
import { ClothingMaterial } from './clothing-material.type';
import { ClothingMeasure } from './clothing-measure.type';
import { ClothingSize } from './clothing-size.type';
import { Image } from './image.type'
import { Product } from './product.type';

@ObjectType()
export class Clothing extends Product {

    @Expose()
    @Field({ nullable: true })
    name?: string

    @Expose()
    @Field(() => Gender, { nullable: true })
    gender?: Gender

    /**
     * 材料
     */
    @Expose()
    @Type(() => ClothingMaterial)
    @Field(() => ClothingMaterial, { nullable: true })
    materials: ClothingMaterial[]

    /**
     * 尺寸
     */
    @Expose()
    @Type(() => ClothingMaterial)
    @Field(() => ClothingMaterial, { nullable: true })
    measures: ClothingMeasure

    /**
     * 测量图
     */
    @Expose()
    @Type(() => Image)
    @Field({ nullable: true })
    measureDiagram: Image

    @Expose()
    @Type(() => ClothingSize)
    @Field(() => ClothingSize, { nullable: true })
    size: ClothingSize

    /**
     * 瑕疵
     */
    @Expose()
    @Type(() => ClothingFlaw)
    @Field(() => ClothingFlaw, { nullable: true })
    flaw?: ClothingFlaw

    /**
     * 评论
     */
    @Expose()
    @Type(() => ClothingComment)
    @Field(() => [ClothingComment], { nullable: true })
    comments?: ClothingComment[]

    constructor(clothing: Partial<Clothing>) {
        super(clothing)

        if (clothing) {
            Object.assign(
                this,
                plainToInstance(Clothing, clothing, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}