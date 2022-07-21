import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent
} from 'typeorm'

import { IBase } from './interface/base.interface'
import { CategoryType } from '@/shared/enums'
import {
    Brand,
    CategoryItem,
    Image,
    ProductUnit,
    ProductUnitSpecTmpl,
} from './'

@Entity({
    name: 'categories',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree("closure-table", {
    // closureTableName: 'categories_closure',
    ancestorColumnName: (column) => "ancestor_" + column.propertyName,
    descendantColumnName: (column) => "descendant_" + column.propertyName,
})
// @TableInheritance({
//     column: {
//         type: "varchar",
//         name: "type"
//     }
// })
export class Category extends IBase<Category> {

    @Expose()
    @Type(() => CategoryItem)
    @Index("IDX_categories_name_type")
    @ManyToOne(() => CategoryItem, categoryItem => categoryItem.categories,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn([
        { name: "name", referencedColumnName: "name" },
        { name: "type", referencedColumnName: "type" },
    ])
    categoryItem?: CategoryItem

    @Expose()
    @Type(() => Brand)
    @OneToMany(() => Brand, brand => brand.category,
        { nullable: true })
    brands?: Brand[]

    @Expose()
    @Type(() => ProductUnit)
    @OneToMany(() => ProductUnit, product => product.category,
        { nullable: true })
    productUnits?: ProductUnit[]

    @Expose()
    @Index("IDX_categories_image_id")
    @ManyToOne(() => Image, image => image.categories,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'image_id' })
    image: Image

    @Expose()
    @Type(() => ProductUnitSpecTmpl)
    @OneToMany(() => ProductUnitSpecTmpl, specTmpl => specTmpl.category,
        { nullable: true })
    productUnitSpectTmplCategory?: ProductUnitSpecTmpl

    @Expose()
    @Type(() => Category)
    @TreeParent()
    @Index("IDX_categories_parent_id")
    // @ManyToOne(() => Category, category => category.children,
    //     { createForeignKeyConstraints: false, nullable: true })
    // @JoinColumn({ name: 'parent_id' })
    parent?: Category

    @Expose()
    @Column({ type:'bigint', nullable: true, name: 'parent_id' })
    parentId: string

    @Expose()
    @Type(() => Category)
    @TreeChildren()
    // @OneToMany(() => Category, category => category.children)
    children?: Category[]

    @Expose()
    @Column({ nullable: true })
    name: String

    @Expose()
    @Column({ default: 1 })
    level?: number

    @Expose()
    @Type(() => String)
    @Column({
        type: "enum",
        name: "type",
        enum: CategoryType,
        default: CategoryType.BOOK
    })
    // @Column()
    type?: CategoryType = CategoryType.BOOK

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