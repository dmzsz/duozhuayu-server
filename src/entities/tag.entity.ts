import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { ProductUnit } from './product-unit.entity'
import { CategoryType } from '@/shared/enums'

@Entity({
    name: 'tags',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Tag extends IBase<Tag> {

    @Expose()
    @Type(() => ProductUnit)
    @ManyToMany(() => ProductUnit, productUnit => productUnit.tags,
        { createForeignKeyConstraints: false, nullable: true })
    // @JoinTable({
    //     name: 'product_units_tags',
    //     joinColumn: {
    //         name: "tag_id",
    //         referencedColumnName: "id"
    //     },
    //     inverseJoinColumn: {
    //         name: "product_unit_id",
    //         referencedColumnName: "id"
    //     }
    // })
    productUnit?: ProductUnit[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Type(() => String)
    @Column({
        type: "enum",
        name: "type",
        enum: CategoryType,
        default: CategoryType.BOOK
    })
    // @Column()
    type: CategoryType = CategoryType.BOOK

    /**
     * 主题颜色
     */
    @Expose()
    @Column({ nullable: true, name: 'mask_color' })
    maskColor: string
    /**
     * 描述
     */
    @Expose()
    @Column({ nullable: true })
    description: string

    constructor(tag: Partial<Tag>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Tag, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}