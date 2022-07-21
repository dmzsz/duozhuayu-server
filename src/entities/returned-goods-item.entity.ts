import {
    Exclude,
    Expose,
    plainToClass,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Customer,
    Employee,
    InboundOrderItem,
    Order,
    ProcurementOrder,
} from '.'
import { PaymentType } from '@/shared/enums'

/**
 * 退货
 * 一件商品一次退货
 */
@Entity({
    name: 'returned_goods_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ReturnedGoodsItem extends IBase<ReturnedGoodsItem> {

    /**
     * 订单 可能会拆包
     */
    @Expose()
    @Type(() => Order)
    @Index("IDX_returned_goods_items_order_id")
    @ManyToOne(() => Order, order => order.returnedGoodsItems)
    @JoinColumn({ name: 'order_id' })
    order: Order

    /**
     * 客户
     */
    @Expose()
    @Type(() => Customer)
    @Index("IDX_returned_goods_items_customer_id")
    @ManyToOne(() => Customer, customer => customer.returnedGoodsItems)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    /**
     * 物流单号
     */
    @Expose()
    @Column({ nullable: true, array: true, name: 'tracking_no' })
    trackingNo?: string

    /**
     * 物流公司
     */
    @Expose()
    @Column({ nullable: true, name: 'logisticsCompany' })
    logisticsCompany?: string

    /**
     * 检查员
     */
    @Expose()
    @Type(() => Employee)
    @OneToOne(() => Employee,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'censor_id' })
    censor?: Employee


    @Expose()
    @Column({ name: 'payment_amount' })
    paymentAmount: number
    /**
     * 支付方式
     */
    @Expose()
    @Column({ type: 'enum', enum: PaymentType, nullable: true, name: 'payment_type' })
    paymentType: PaymentType

    /**
     * 理由
     */
    @Expose()
    @Column({ nullable: true, name: 'refused_reason' })
    reason?: string

    /**
     * 
     * @param returnedGoodsItem 
     */
    constructor(returnedGoodsItem: Partial<ReturnedGoodsItem>) {
        super(returnedGoodsItem)

        if (returnedGoodsItem) {
            Object.assign(
                this,
                plainToInstance(ReturnedGoodsItem, returnedGoodsItem, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}