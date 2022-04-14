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
export class BrandCategory extends Category {

    @Expose()
    @Type(() => Brand)
    @Field(() => Brand, { nullable: true })
    brand?: Brand


    constructor(category: Partial<BrandCategory>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(BrandCategory, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}