import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { KindleSpecification } from './product-pecification.type'
import { ProductFlaw } from './product-flaw.type'
import { Product } from './product.type'

@ObjectType()
export class Electronics extends Product {
    
    @Expose()
    @Field()
    description: string

    @Expose()
    @Type(() => KindleSpecification)
    @Field(() => [KindleSpecification], { nullable: true })
    kindleSpecifications?: KindleSpecification[]

    @Expose()
    @Type(() => ProductFlaw)
    @Field(() => ProductFlaw, { nullable: true })
    flaw?: ProductFlaw

    @Expose()
    @Field({ nullable: true })
    officialSite: string

    constructor(electronics: Partial<Electronics>) {
        super(electronics)

        if (electronics) {
            Object.assign(
                this,
                plainToInstance(Electronics, electronics, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}