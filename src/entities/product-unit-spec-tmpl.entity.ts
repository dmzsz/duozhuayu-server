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
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Category,
    Customer,
    ProductUnit,
    ProductUnitSpec,
    ProductUnitSpecValue,
} from './'

/**
 * 产品单元规格模板（品类）
 * 一般大类的商品规格大致相同.比喻图书的规格基本固定, 不会因为出版商国家等因素而不同
 */
@Entity({
    name: 'product_unit_spec_tmpls',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductUnitSpecTmpl extends IBase<ProductUnitSpecTmpl> {

    @Expose()
    @Type(() => ProductUnit)
    @OneToMany(() => ProductUnit, productUnit => productUnit.specTmpl,
        { createForeignKeyConstraints: false, nullable: true })
    productUnit?: ProductUnit

    @Expose()
    @Type(() => ProductUnitSpec)
    @ManyToMany(() => ProductUnitSpec, productUnit => productUnit.productUnitSpecTmpls,
        { createForeignKeyConstraints: false, nullable: true })
    specs?: ProductUnitSpec[]

    // 店中店的管理员customer id 或者是 店中店id 
    // @Expose()
    // @ManyToOne(() => Customer, customer => customer.specTmpl,
    //     { nullable: true })
    // @JoinColumn({ name: 'customer_id' })
    // belongsToCustomer: Customer

    @Expose()
    @Index("product_unit_spec_tmpls_category_id")
    @ManyToOne(() => Category, category => category.productUnitSpectTmplCategory,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'category_id' })
    category?: Category

    @Expose()
    @Column({ type: 'bigint', nullable: true, name: 'category_id' })
    categoryId: string

    @Expose()
    @Column()
    name: string

    constructor(specTmpl: Partial<ProductUnitSpecTmpl>) {
        super(specTmpl)

        if (specTmpl) {
            Object.assign(
                this,
                plainToInstance(ProductUnitSpecTmpl, specTmpl, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}