import { IBase } from './interface/base.interface'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { CategoryType } from '@/shared/enums'
import { Clothing } from './clothing.type'
import { Book } from './book.type'
import { Electronics } from './electronics.type'
import { Brand } from './brand.type'
import { Category } from './category.type'

@ObjectType({
    implements: () => [Category],
})
export class ClothingCategory extends Category {

    @Expose()
    @Type(() => Clothing)
    @Field(() => Clothing, { nullable: true })
    clothing?: Clothing

    constructor(category: Partial<ClothingCategory>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(ClothingCategory, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}