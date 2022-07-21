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
    Coupon,
    Customer,
    Order,
} from './'

/**
 * 用户领取的优惠券
 */
@Entity({
    name: 'customer_coupons',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_customer_coupons_customer_id_coupon_id", ["customer", "coupon"])
export class CustomerCoupon extends IBase<CustomerCoupon> {

    @Expose()
    @Type(() => Customer)
    @Index("IDX_customer_coupons_customer_id")
    @ManyToOne(() => Customer, customer => customer.coupons,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Expose()
    @Type(() => Coupon)
    @Index("IDX_customer_coupons_coupon_id")
    @ManyToOne(() => Coupon, Coupon => Coupon.customerCoupons,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'coupon_id' })
    coupon: Coupon

    @Expose()
    @Type(() => Order)
    @ManyToMany(() => Order, order => order.coupons,
        { createForeignKeyConstraints: false, nullable: true })
    orders: Order[]

    @Expose()
    @Column()
    name: string

    /**
     * 描述
     */
    @Expose()
    @Column({ nullable: true })
    description: string

    constructor(tag: Partial<CustomerCoupon>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(CustomerCoupon, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}