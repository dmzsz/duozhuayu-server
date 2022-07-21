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
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    ProductSpecValue,
    ProductUnitSpec
} from './'

/**
 * 产品单元规格值
 */
@Entity({
    name: 'product_unit_spec_values',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductUnitSpecValue extends IBase<ProductUnitSpecValue> {


    @Expose()
    @Type(() => ProductSpecValue)
    @OneToMany(() => ProductSpecValue, spec => spec.specValue,
        { nullable: true })
    productSpecValues?: ProductSpecValue[]

    @Expose()
    @Type(() => ProductUnitSpec)
    @Index("IDX_product_unit_spec_values_spec_id")
    @ManyToOne(() => ProductUnitSpec, spec => spec.specValues,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'spec_id' })
    spec?: ProductUnitSpec

    @Expose()
    @Column()
    value: string

    constructor(specValue: Partial<ProductUnitSpecValue>) {
        super(specValue)

        if (specValue) {
            Object.assign(
                this,
                plainToInstance(ProductUnitSpecValue, specValue, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}