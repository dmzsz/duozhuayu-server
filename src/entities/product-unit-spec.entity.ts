import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Category,
    ProductUnit,
    ProductUnitSpecTmpl,
    ProductUnitSpecValue,
} from './'

/**
 * 产品单元规格
 */
@Entity({
    name: 'product_unit_specs',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductUnitSpec extends IBase<ProductUnitSpec> {

    @Expose()
    @Type(() => ProductUnitSpecTmpl)
    @ManyToMany(() => ProductUnitSpecTmpl, productUnitSpecTmpl => productUnitSpecTmpl.specs,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinTable({
        name: 'product_unit_spec_tmpls_specs',
        joinColumn: {
            name: 'product_unit_spec_id',
        },
        inverseJoinColumn: {
            name: 'product_unit_spec_tmpl_id'
        }
    })
    productUnitSpecTmpls?: ProductUnitSpecTmpl[]

    @Expose()
    @Index("IDX_product_unit_spec_category_id")
    @ManyToOne(() => Category, category => category.productUnits,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'category_id' })
    type: Category

    @Expose()
    @Type(() => ProductUnitSpecValue)
    @OneToMany(() => ProductUnitSpecValue, specValue => specValue.spec)
    specValues: ProductUnitSpecValue[]

    /**
     * 规格英文名
     */
    @Expose()
    @Column()
    name: string

    /**
     * 规格中文名
     */
    @Expose()
    @Column({ name: 'descriptive_name' })
    descriptiveName: string

    constructor(spec: Partial<ProductUnitSpec>) {
        super(spec)

        if (spec) {
            Object.assign(
                this,
                plainToInstance(ProductUnitSpec, spec, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}