import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { ProductUnit } from './product-unit.entity'
import { IBase } from './interface/base.interface'
import { SpecificationValue } from './specification-value.entity'

/**
 * 商品属性表
 */
@Entity({
    name: 'specifications',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Specification extends IBase<Specification> {

    @Expose()
    @Type(() => ProductUnit)
    @ManyToMany(() => ProductUnit, productUnit => productUnit.specifications,
        { createForeignKeyConstraints: false })
    @JoinTable({ name: 'product_units_specifications' })
    productUnit: ProductUnit

    @Expose()
    @Type(() => SpecificationValue)
    @OneToMany(() => SpecificationValue, specificationValue => specificationValue.specification)
    specificationValue: SpecificationValue[]

    @Expose()
    @Column()
    name: string

    constructor(specification: Partial<Specification>) {
        super(specification)

        if (specification) {
            Object.assign(
                this,
                plainToInstance(Specification, specification, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}