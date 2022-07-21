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
    InboundOrder,
    ProcurementOrder,
} from '.'
import { Condition, FlawReasons } from '@/shared/enums'

/**
 * 入库详情
 */
@Entity({
    name: 'inbound_order_item',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class InboundOrderItem extends IBase<InboundOrderItem> {

    /**
     * 入库单
     */
    @Expose()
    @Type(() => InboundOrder)
    @Index('IDX_inbound_order_item_inboundOrder_id')
    @ManyToOne(() => InboundOrder, inboundOrder => inboundOrder.inboundOrderItems,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'inboundOrder_id' })
    inboundOrder: InboundOrder

    /**
     * 检查员
     */
    @Expose()
    @OneToOne(() => Employee,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'censor_id' })
    censor?: Employee


    @Expose()
    @Column({ nullable: true, name: 'sn_code' })
    snCode: string

    /**
     * 审查状态
     */
    @Expose()
    @Column({ nullable: true, default: true, name: 'censored_status' })
    censoredStatus?: boolean = true


    /**
     * 品相
     */
    @Expose()
    @Type(() => String)
    @Column({ type: 'enum', enum: Condition, default: Condition.FINE, nullable: true })
    condition?: Condition = Condition.FINE

    /**
     * 
     * @param inboundOrderItem 
     */
    constructor(inboundOrderItem: Partial<InboundOrderItem>) {
        super(inboundOrderItem)

        if (inboundOrderItem) {
            Object.assign(
                this,
                plainToInstance(InboundOrderItem, inboundOrderItem, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}