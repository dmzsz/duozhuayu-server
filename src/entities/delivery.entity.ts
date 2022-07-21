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
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Address,
    DeliveryGoodsItem,
    Employee,
    Order,
    Warehouse,
} from '.'
import { LogisticsStatus } from '@/shared/enums'

/**
 * 快递
 */
@Entity({
    name: 'deliveries',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Delivery extends IBase<Delivery> {

    /**
     * 订单 可能会拆包
     */
    @Expose()
    @Type(() => Order)
    @Index("IDX_deliveries_order_id")
    @OneToOne(() => Order,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'order_id' })
    order: Order

    @Expose()
    @Type(() => DeliveryGoodsItem)
    @OneToMany(() => DeliveryGoodsItem, deliveryGoodsItem => deliveryGoodsItem.delivery,
        { createForeignKeyConstraints: false, nullable: true })
    deliveryGoodsItems?: DeliveryGoodsItem[]

    @Expose()
    @Type(() => Employee)
    @Index("IDX_deliveries_address_id")
    @OneToOne(() => Address,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'address_id' })
    address: Address

    @Expose()
    @Type(() => Warehouse)
    @OneToOne(() => Warehouse,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse

    /**
     * 检查员
     */
    @Expose()
    @Type(() => Employee)
    @OneToOne(() => Employee,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'censor_id' })
    censor?: Employee

    /**
     * 打包员
     */
    @Expose()
    @OneToOne(() => Employee,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'packaged_delivery_id' })
    packaged_Delivery?: Employee

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
     * 邮费
     */
    @Expose()
    @Column({ nullable: true })
    postage?: number


    /**
     * 物流状态
     */
    @Expose()
    @Column({ type: 'enum', enum: LogisticsStatus, nullable: true, name: 'logistics_status' })
    logisticsStatus?: LogisticsStatus
    
    /**
     * 
     * @param delivery 
     */
    constructor(delivery?: Partial<Delivery>) {
        super(delivery)

        if (delivery) {
            Object.assign(
                this,
                plainToInstance(Delivery, delivery, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}