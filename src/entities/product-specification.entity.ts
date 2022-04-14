import { Expose, plainToInstance, Type } from 'class-transformer'
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { SpecificationValue } from './specification-value.entity'

/**
 * 商品属性表
 */
@Entity({
    name: 'product_specifications',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductSpecification extends IBase<ProductSpecification> {

    @Expose()
    @Type(() => Product)
    @ManyToOne(() => Product, product => product.specifications)
    product: Product

    name: string

    /**
     * value 需要做额外限制才行
     * 比如 手机内存8G specificationValueId必须是specifications表中name为手机内存的行对应在specifications表中位取到的value:8G行属性id 
     * 不能是笔记本内存或者台式机内存对应的8g内存 
     * 这两个8G是不同的
     * 创建的时候费点劲，但是对搜索的时候取值取属性列表比较方便
     */
    @Expose()
    @Type(() => SpecificationValue)
    @OneToOne(() => SpecificationValue, specificationValue => specificationValue.specification)
    @JoinColumn({ name: 'specification_value_id' })
    specificationValue: SpecificationValue[]

    value: string

    constructor(specification: Partial<ProductSpecification>) {
        super(specification)

        if (specification) {
            Object.assign(
                this,
                plainToInstance(ProductSpecification, specification, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}