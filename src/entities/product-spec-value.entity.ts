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
    OneToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Product,
    ProductUnitSpecValue
} from './'

/**
 * 商品规格值
 */
@Entity({
    name: 'product_spec_values',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductSpecValue extends IBase<ProductSpecValue> {

    @Expose()
    @Type(() => Product)
    @Index("IDX_product_spec_values_product_id")
    @ManyToOne(() => Product, product => product.specs,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'product_id' })
    product?: Product

    /**
     * value 需要做额外限制才行
     * 比如 手机内存8G specValueId必须是specs表中name为手机内存的行对应在specs表中位取到的value:8G行属性id 
     * 不能是笔记本内存或者台式机内存对应的8g内存 
     * 这两个8G是不同的
     * 创建的时候费点劲，但是对搜索的时候取值取属性列表比较方便
     */
    @Expose()
    @Type(() => ProductUnitSpecValue)
    @Index("IDX_product_spec_values_spec_value_id")
    @ManyToOne(() => ProductUnitSpecValue, specValue => specValue.spec,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'spec_value_id' })
    specValue: ProductUnitSpecValue[]

    // 为了加速访问 本来需要通过specValue属性在通过关联的ProductUnitSpec 获取name的
    @Expose()
    @Column({ nullable: true })
    name: string

    // 为了加速访问 本来需要通过specValue属性获取value
    @Expose()
    @Column({ type: 'json', nullable: true })
    value: object

    constructor(spec: Partial<ProductSpecValue>) {
        super(spec)

        if (spec) {
            Object.assign(
                this,
                plainToInstance(ProductSpecValue, spec, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}