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
    FlawReasons
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Address,
    City,
    Customer,
    Employee,
    GoodsItem,
    Image,
    InboundOrder,
    OrderProduct,
    Procurement,
    ProcurementOrder,
    Product,
    Supplier,
} from '.'

/**
 * 仓库/门店
 */
@Entity({
    name: 'warehouses',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Warehouse extends IBase<Warehouse> {

    @Type(() => Address)
    @OneToOne(() => Address,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'address_id' })
    address: Address

    /**
     * 货物
     */
    @Expose()
    @Type(() => GoodsItem)
    @OneToMany(() => GoodsItem, goodsItem => goodsItem.warehouse,
        { nullable: true })
    goodsItem: GoodsItem

    /**
     * 采购订单
     */
    @Expose()
    @Type(() => ProcurementOrder)
    @OneToMany(() => ProcurementOrder, procurementOrder => procurementOrder.warehouse,
        { nullable: true })
    procurementOrders?: ProcurementOrder[]


    // /**
    //  * 入库单
    //  */
    // @Expose()
    // @Type(() => InboundOrder)
    // @OneToMany(() => InboundOrder, inboundOrder => inboundOrder.warehouse,
    //     { nullable: true })
    // inboundOrders?: InboundOrder[]

    /**
     * 
     * @param warehouse 
     */
    constructor(warehouse: Partial<Warehouse>) {
        super(warehouse)

        if (warehouse) {
            Object.assign(
                this,
                plainToInstance(Warehouse, warehouse, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}