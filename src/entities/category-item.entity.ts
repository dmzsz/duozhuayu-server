import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, TableInheritance, Tree, TreeChildren, TreeParent, Unique } from 'typeorm'
import { IBase } from './interface/base.interface'
import { CategoryType } from '@/shared/enums'
import { ProductUnit } from './product-unit.entity'
import { Category } from './category.entity'
import category from '@/seed/book-category'
import { IBaseExcludeId } from './interface/base-exclude-id.interface'

@Entity({
    name: 'category_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class CategoryItem extends IBaseExcludeId<CategoryItem> {

    @Expose()
    @Type(() => Category)
    @OneToMany(() => Category, category => category.categoryItem)
    category?: Category

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