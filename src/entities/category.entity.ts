import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, TableInheritance, Tree, TreeChildren, TreeParent } from 'typeorm'
import { IBase } from './interface/base.interface'
import { CategoryType } from '@/shared/enums'
import { ProductUnit } from './product-unit.entity'
import { CategoryItem } from './category-item.entity'

@Entity({
    name: 'categories',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree("closure-table")
@TableInheritance({
    column: {
        type: "enum",
        name: "type",
        enum: CategoryType,
        default: CategoryType.BOOK
    }
})
export class Category extends IBase<Category> {

    @Expose()
    @Type(() => CategoryItem)
    @ManyToOne(() => CategoryItem, categoryItem => categoryItem.category,
        { createForeignKeyConstraints: false })
    @JoinColumn([
        { name: "name", referencedColumnName: "name" },
        { name: "categoryType", referencedColumnName: "type" },
    ])
    categoryItem?: CategoryItem

    @Expose()
    @Column({ nullable: true })
    name: String

    @Expose()
    @Column({ nullable: true })
    categoryType: String

    @Expose()
    @Type(() => Category)
    @TreeParent()
    parent?: Category

    @Expose()
    @Type(() => Category)
    @TreeChildren()
    children?: Category[]

    @Expose()
    @Type(() => Category)
    @Column({ default: 1 })
    level?: number

    @Expose()
    @Type(() => String)
    // @Column({
    //     type: "enum",
    //     name: "type",
    //     enum: CategoryType,
    //     nullable: true
    // })
    @Column()
    type?: CategoryType

    @Expose()
    @Column({ nullable: true })
    themeColor?: string

    @Expose()
    @Column({ nullable: true })
    description?: string

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