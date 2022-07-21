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

import {
    LogisticsStatus,
    OrderType,
    PaymentStatus,
    PaymentType,
    ProductStatus
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Coupon,
    Customer,
    CustomerCoupon,
    Delivery,
    GoodsItem,
    OrderProduct,
    Product,
    ReturnedGoodsItem,
} from './'

@Entity({
    name: 'orders',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Order extends IBase<Order> {

    @Expose()
    @Type(() => Customer)
    @Index("IDX_orders_customer_id")
    @ManyToOne(() => Customer, customer => customer.orders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    @Expose()
    @Type(() => OrderProduct)
    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order,
        { createForeignKeyConstraints: false, nullable: true })
    orderProducts?: OrderProduct[]

    /**
     * 优惠券
     */
    @Expose()
    @Type(() => CustomerCoupon)
    @ManyToMany(() => CustomerCoupon, customerCoupon => customerCoupon.orders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinTable({
        name: 'customer_coupons_orders',
        joinColumn: {
            name: "customer_coupon_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "coupon_id",
            referencedColumnName: "id"
        }
    })
    coupons?: CustomerCoupon[]

    /**
     * 物流
     */
    @Expose()
    @Type(() => Delivery)
    @OneToOne(() => Delivery,
        { createForeignKeyConstraints: false })
    delivery: Delivery

    /**
     * 退货
     */
    @Expose()
    @Type(() => ReturnedGoodsItem)
    @OneToMany(() => ReturnedGoodsItem, returnedGoodsItem => returnedGoodsItem.order,
        { createForeignKeyConstraints: false, nullable: true })
    returnedGoodsItems?: ReturnedGoodsItem[]

    /**
     * 订单号
     */
    @Expose()
    @Column({ nullable: true, type: 'bigint' })
    code?: number

    /**
     * 实付款
     */
    @Expose()
    @Column({ nullable: true })
    amount?: number

    /**
     * 优惠总金额
     */
    @Expose()
    @Column({ nullable: true, name: 'discountTotal' })
    discountTotalNum?: number

    /**
     * 支付状态
     */
    @Expose()
    @Column({ type: 'enum', enum: PaymentStatus, nullable: true, name: 'payment_status' })
    paymentStatus?: PaymentStatus
    // set setPaymentstatus(value: PaymentStatus) {
    //     this.paymentStatus = value
    //     if (value == PaymentStatus.BUYER_PAYS) {

    //     }
    // }

    @Expose()
    @Column({ nullable: true, name: 'payment_at' })
    paymentAt?: Date

    /**
     * 支付方式
     */
    @Expose()
    @Column({ type: 'enum', enum: PaymentType, default: PaymentType.WECHAT_PAY, nullable: true, name: 'payment_type' })
    paymentType?: PaymentType

    /**
     * 是否匿名
     */
    @Expose()
    @Column({ nullable: true, default: false, name: 'is_anonyous' })
    isAnonymous?: boolean = false

    // /**
    //  * 商品状态
    //  */
    // @Expose()
    // @Column({ type: 'enum', enum: ProductStatus, nullable: true, name: 'product_status' })
    // productStatus: ProductStatus

    @Expose()
    @Column({ type: 'enum', enum: OrderType, nullable: true })
    type?: OrderType

    @Expose()
    @Column('timestamp', { nullable: true, name: 'finished_at' })
    finishedAt?: Date

    /**
     * 
     * @param order 
     */
    constructor(order: Partial<Order>) {
        super(order)

        if (order) {
            Object.assign(
                this,
                plainToInstance(Order, order, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}