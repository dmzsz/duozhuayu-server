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
    Employee,
    InboundOrderItem,
    ProcurementOrder,
} from '.'

/**
 * 入库单
 */
@Entity({
    name: 'inbound_order',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class InboundOrder extends IBase<InboundOrder> {

    /**
     * 采购订单
     */
    @Expose()
    @Type(() => ProcurementOrder)
    @Index('IDX_inbound_orders_procurement_order_id')
    @ManyToOne(() => ProcurementOrder, procurementOrder => procurementOrder.inboundOrders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'procurement_order_id' })
    procurementOrder: ProcurementOrder

    /**
     * 入库详情
     */
    @Expose()
    @Type(() => InboundOrderItem)
    @OneToMany(() => InboundOrderItem, inboundOrderItem => inboundOrderItem.inboundOrder,
        { createForeignKeyConstraints: false, nullable: true })
    inboundOrderItems: InboundOrderItem[]

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
     * 操作员
     */
    @Expose()
    @OneToOne(() => Employee,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'operator_id' })
    operator: Employee

    /**
     * 
     * @param inboundOrder 
     */
    constructor(inboundOrder: Partial<InboundOrder>) {
        super(inboundOrder)

        if (inboundOrder) {
            Object.assign(
                this,
                plainToInstance(InboundOrder, inboundOrder, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}