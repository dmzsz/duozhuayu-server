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
    OneToOne,
} from 'typeorm'

import {
    Condition,
    LogisticsStatus,
    OrderType,
    PaymentStatus,
    ProductStatus
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Order,
    Product,
    Customer,
} from './'

/**
 * 订单商品详情
 */
@Entity({
    name: 'order_products',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class OrderProduct extends IBase<OrderProduct> {

    @Expose()
    @Type(() => Order)
    @ManyToOne(() => Order, order => order.orderProducts,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'order_id' })
    order?: Order

    @Expose()
    @Type(() => Product)
    @ManyToOne(() => Product, product => product.orderProducts,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'product_id' })
    product?: Product

    /**
     * 品相
     */
    @Expose()
    @Column({ type: 'enum', enum: Condition, default: Condition.MEDIUM, nullable: true })
    condition?: Condition = Condition.MEDIUM

    /**
     * 数量
     */
    @Expose()
    @Column({ default: 1 })
    count?: number

    /**
     * 售价
     */
    @Expose()
    @Column({ type: 'decimal', nullable: true })
    price?: number

    /**
     * 锁定
     */
    @Expose()
    @Column({ nullable: true, name: 'is_locked' })
    isLocked?: boolean

    /**
     * 锁定个数 现阶段统一为1 页面上没有锁定多个的功能,中古的东西一般也不会买多个
     */
    @Expose()
    @Column({ nullable: true, name: 'locked_number', default: 1 })
    lockedNumber?: number

    /**
     * 
     * @param order 
     */
    constructor(order: Partial<OrderProduct>) {
        super(order)

        if (order) {
            Object.assign(
                this,
                plainToInstance(OrderProduct, order, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}
