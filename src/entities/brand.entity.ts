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
    OneToOne
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Category,
    Image,
    Product,
    ProductUnit,
} from './'

@Entity({
    name: 'brands',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Brand extends IBase<Brand> {

    @Expose()
    @Type(() => ProductUnit)
    @OneToMany(() => ProductUnit, product => product.brand,
        { nullable: true })
    productUnit?: ProductUnit[]

    @Expose()
    @Type(() => Category)
    @Index("IDX_brands_category_id")
    @ManyToOne(() => Category, category => category.brands,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'category_id' })
    category: Category

    @Expose()
    @Type(() => Image)
    @OneToMany(() => Image, image => image.brand,
        { nullable: true })
    images: Image[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ nullable: true, name: 'chinese_title' })
    chineseTitle: string

    /**
     * 简介
     */
    @Expose()
    @Column({ nullable: true })
    intro: string

    constructor(tag: Partial<Brand>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Brand, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}