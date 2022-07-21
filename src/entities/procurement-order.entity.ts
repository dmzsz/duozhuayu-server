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

import {
    Condition,
    FlawReasons,
    ProcurementAuditStatus,
    ProcurementDocStatus,
    ProcurementOrderStatus,
    ProcurementOrderType
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Customer,
    Employee,
    Image,
    InboundOrder,
    OrderProduct,
    Procurement,
    Product,
    Supplier,
    Warehouse,
} from '.'

/**
 * 采购
 */
@Entity({
    name: 'procurement_orders',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ProcurementOrder extends IBase<ProcurementOrder> {

    /**
     * 供应商
     */
    @Expose()
    @Type(() => Supplier)
    @Index('IDX_procurement_orders_supplier_id')
    @ManyToOne(() => Supplier, supplier => supplier.procurementOrders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'supplier_id' })
    supplier?: Supplier

    /**
     * 仓库/门店
     */
    @Expose()
    @Type(() => Supplier)
    @Index('IDX_procurement_orders_warehouse_id')
    @ManyToOne(() => Supplier, supplier => supplier.procurementOrders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse?: Warehouse

    /**
     * 创建采购订单的员工
     */
    @Expose()
    @Index('IDX_procurement_orders_buyer_id')
    @ManyToOne(() => Employee, employee => employee.procurementOrders,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'buyer_id' })
    buyer: Employee


    /**
     * 入库单
     */
    @Expose()
    @Type(() => InboundOrder)
    @OneToMany(() => InboundOrder, inboundOrder => inboundOrder.procurementOrder,
        { createForeignKeyConstraints: false, nullable: true })
    inboundOrders: InboundOrder[]

    /**
     * 物流单号
     */
    @Expose()
    @Column({ type: 'varchar', nullable: true, array: true, name: 'tracking_no' })
    trackingNo?: string[]

    /**
     * 物流公司
     */
    @Expose()
    @Column({ nullable: true, name: 'logisticsCompany' })
    logisticsCompany?: string

    /**
     * 可以分为  草稿订单 采购订单 退回订单
     */
    @Expose()
    @Column({
        type: 'enum',
        enum: ProcurementOrderType,
        default: ProcurementOrderType.GENERAL
    })
    type: ProcurementOrderType = ProcurementOrderType.GENERAL

    /**
     * 没有审核通过前一般没有状态
     */
    @Expose()
    @Column({
        type: 'enum',
        enum: ProcurementOrderStatus,
        nullable: true
    })
    status?: ProcurementOrderStatus

    @Expose()
    @Column({
        type: 'enum',
        enum: ProcurementOrderStatus,
        nullable: true, name: 'audit_status'
    })
    auditStatus?: ProcurementAuditStatus

    /**
     * 文档状态
     * 完善文档的状态 涉及到 核对订单，收纳票据和计算发票
     */
    @Expose()
    @Column({
        type: 'enum',
        enum: ProcurementDocStatus,
        default: ProcurementDocStatus.NONE,
        nullable: true,
        name: 'doc_status'
    })
    docStatus: ProcurementDocStatus = ProcurementDocStatus.NONE

    /**
     * 
     * @param procurement 
     */
    constructor(procurement: Partial<ProcurementOrder>) {
        super(procurement)

        if (procurement) {
            Object.assign(
                this,
                plainToInstance(ProcurementOrder, procurement, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}