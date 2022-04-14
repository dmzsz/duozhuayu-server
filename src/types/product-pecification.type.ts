import { KindleSpecificationLabel } from '@/shared/enums'
import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance } from 'class-transformer'
import { Type } from '@nestjs/common'

type Lable = KindleSpecificationLabel
const ValueUnion = createUnionType({
    name: 'ValueUnion',
    types: () => [Number, String, Boolean] as const,
});

@ObjectType()
export class KindleSpecification {
    @Expose()
    @Field()
    name: string

    // @Expose()
    // @Field()
    // lable: Lable

    @Expose()
    @Field(() => Number)
    value: number

    constructor(kindleSpecification: Partial<KindleSpecification>) {

        if (kindleSpecification) {
            Object.assign(
                this,
                plainToInstance(KindleSpecification, kindleSpecification, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}