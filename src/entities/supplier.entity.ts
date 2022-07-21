import {
    Exclude,
    Expose,
    plainToClass,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Entity,
    Column,
    OneToMany,
    PrimaryColumn,
    ManyToOne,
} from 'typeorm'

import { SupplierType } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    GoodsItem,
    InboundOrder,
    ProcurementOrder,
    Product,
} from './'


/**
 * 供应商
 */
@Entity({
    name: 'supplier',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Supplier extends IBase<Supplier> {

    /**
     * 出售的所有商品
     */
    @Expose()
    @Type(() => GoodsItem)
    @OneToMany(() => GoodsItem, goodsItem => goodsItem.supplier,
        { nullable: true })
    saleGoods?: GoodsItem[]

    /**
     * 归属于采购订单
     */
    @Expose()
    @Type(() => ProcurementOrder)
    @OneToMany(() => ProcurementOrder, procurement => procurement.supplier,
        { nullable: true })
    procurementOrders?: ProcurementOrder[]

    /**
     * 编码
     */
    @Expose()
    @Column()
    code?: string

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ type: 'enum', enum: SupplierType })
    type?: SupplierType

    /**
     * 联络人
     */
    @Expose()
    @Column()
    linkman?: string

    /**
     * 联络人电话
     */
    @Expose()
    @Column()
    tel?: string

    /**
     * 供货商地址
     */
    @Expose()
    @Column()
    address?: string

    /**
     * 开户银行名称
     */@Expose()
    @Column()
    bankName?: string

    /**
     * 开户银行账户
     */
    @Expose()
    @Column({ name: 'bank_account' })
    bankAccount?: string

    constructor(supplier: Partial<Supplier>) {
        super(supplier)

        if (supplier) {
            Object.assign(
                this,
                plainToInstance(Supplier, supplier, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}