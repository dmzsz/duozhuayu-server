import { ChildEntity, Column, ManyToOne, OneToOne } from 'typeorm'
import { Brand } from './brand.entity'
import { CategoryType } from '@/shared/enums'
import { Category } from './category.entity'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Product } from './product.entity'
import { ProductUnit } from './product-unit.entity'

@ChildEntity(CategoryType.PRODUCT)
export class ProductUnitCategory extends Category {

    @Expose()
    @Type(() => ProductUnit)
    @ManyToOne(() => ProductUnit, product => product.category,
        { nullable: true })
    productUnit?: ProductUnit

    constructor(category: Partial<ProductUnitCategory>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(ProductUnitCategory, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}