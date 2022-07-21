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
    Delivery,
    Employee,
    GoodsItem
} from '.'

/**
 * 快递货物
 */
@Entity({
    name: 'delivery_goods_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class DeliveryGoodsItem extends IBase<DeliveryGoodsItem> {

    /**
     * 订单 可能会拆包
     */
    @Expose()
    @Type(() => Delivery)
    @Index("IDX_delivery_goods_items_delivery_id")
    @ManyToOne(() => Delivery, delivery => delivery.deliveryGoodsItems)
    @JoinColumn({ name: 'delivery_id' })
    delivery: Delivery

    @Expose()
    @Type(() => GoodsItem)
    @OneToOne(() => GoodsItem,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'goodsItem_id' })
    goodsItem: GoodsItem

    @Expose()
    @Column()
    number: number

    /**
     * 
     * @param delivery 
     */
    constructor(delivery?: Partial<DeliveryGoodsItem>) {
        super(delivery)

        if (delivery) {
            Object.assign(
                this,
                plainToInstance(DeliveryGoodsItem, delivery, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}