import { IBase } from './interface/base.interface'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { CategoryType } from '@/shared/enums'

@InterfaceType({
    implements: () => [IBase],
})
export class Category extends IBase<Category> {

    @Expose()
    @Type(() => Category)
    @Field(() => Category, { nullable: true })
    parent: Category

    @Expose()
    @Type(() => Category)
    @Field(() => [Category], { nullable: true })
    children: Category[]

    @Expose()
    @Field({ nullable: true, defaultValue: 0 })
    depth: number

    @Expose()
    @Field()
    name: string

    @Expose()
    @Field({nullable: true})
    type?: CategoryType

    constructor(category: Partial<Category>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(Category, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}