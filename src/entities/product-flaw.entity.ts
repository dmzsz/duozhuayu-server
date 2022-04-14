import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { Exclude, Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { Image } from './image.entity'
import { IBase } from './interface/base.interface'
import { Product } from './product.entity'


/**
 * 产品瑕疵
 */
@Entity({
    name: 'product_flaws',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProductFlaw extends IBase<ProductFlaw> {

    @Expose()
    @Type(() => Product)
    @OneToOne(() => Product, product => product.flaw)
    @JoinColumn()
    product: Product

    @Expose()
    @Type(() => Image)
    @OneToMany(() => Image, image => image.productFlaw)
    images?: Image[]

    /**
     * 磨损整体描述
     */
    @Expose()
    @Column()
    flawReason: string

    constructor(productFlaw: Partial<ProductFlaw>) {
        super(productFlaw)

        if (productFlaw) {
            Object.assign(
                this,
                plainToInstance(ProductFlaw, productFlaw, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}