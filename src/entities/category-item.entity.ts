import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    OneToMany,
    PrimaryColumn
} from 'typeorm'

import { IBaseExcludeId } from './interface/base-exclude-id.interface'
import { IBase } from './interface/base.interface'
import { CategoryType } from '@/shared/enums'
import {
    Category,
    ProductUnit,
} from '.'

@Entity({
    name: 'category_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class CategoryItem extends IBaseExcludeId<CategoryItem> {

    @Expose()
    @Type(() => Category)
    @OneToMany(() => Category, category => category.categoryItem,
        { nullable: true })
    categories?: Category[]

    @Expose()
    @PrimaryColumn()
    name: string

    @Expose()
    @Type(() => String)
    @Column({ type: 'enum', enum: CategoryType, nullable: true })
    @PrimaryColumn()
    type?: CategoryType

    @Expose()
    @Column({ nullable: true })
    description?: string

    constructor(category: Partial<CategoryItem>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(CategoryItem, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}