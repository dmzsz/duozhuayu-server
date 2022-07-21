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
    Customer,
    Employee,
    Image,
    OrderProduct,
    Product,
    Supplier,
    Warehouse,
} from '.'

/**
 * 仓库中的商品
 */
@Entity({
    name: 'goods_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class GoodsItem extends IBase<GoodsItem> {

    @Expose()
    @Type(() => Product)
    @Index("IDX_goods_items_from_product_id")
    @ManyToOne(() => Product, product => product.goodsItems,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'product_id' })
    product: Product

    @Expose()
    @Column({ type: 'bigint', nullable: true, name: 'product_id' })
    productId?: string

    /**
     * 卖家
     */
    @Expose()
    @Type(() => Customer)
    @Index("IDX_goods_items_seller_id")
    @ManyToOne(() => Customer, customer => customer.saleProducts,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'seller_id' })
    seller?: Customer

    /**
     * 供应商
     */
    @Expose()
    @Type(() => Supplier)
    @Index("IDX_goods_items_supplier_id")
    @ManyToOne(() => Supplier, supplier => supplier.saleGoods,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'supplier_id' })
    supplier?: Supplier

    /**
     * 所属仓库
     * 没有实体零售店,一般之存放在仓库中.
     * 也有可能出现在分公司中 方便工作人员审核,这时值会为空
     */
    @Expose()
    @Type(() => Warehouse)
    @Index("IDX_goods_items_warehouse_id")
    @ManyToOne(() => Warehouse, warehouse => warehouse.goodsItem,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse?: Warehouse

    /**
     * 坏损图片
     */
    @Expose()
    @Type(() => Image)
    @OneToMany(() => Image, image => image.goodsItem,
        { nullable: true })
    flawImages?: Image[]

    /**
     * sn码
     */
    @Expose()
    @Column({ nullable: true, name: 'serial_no' })
    SerialNo?: string

    /**
     * 售价
     */
    @Expose()
    @Column({ type: 'decimal', nullable: true })
    price?: number

    /**
     * 回收价格
     */
    @Expose()
    @Column({ type: 'decimal', nullable: true, name: 'recycling_price' })
    recyclingPrice?: number

    /**
     * 品相
     */
    @Expose()
    @Type(() => String)
    @Column({ type: 'enum', enum: Condition, default: Condition.FINE, nullable: true })
    condition?: Condition = Condition.FINE

    /**
     * 磨损整体描述
     */
    @Expose()
    @Column({ type: 'json', nullable: true, name: 'flaw_reason' })
    flawReason?: FlawReasons[]

    /**
     * 来自与采购
     */
    @Expose()
    @Column({ default: false, name: 'from_procurement' })
    fromProcurement?: boolean

    /**
     * 拒绝理由
     */
    @Expose()
    @Column({ nullable: true, name: 'refused_reason' })
    refusedReason?: string

    /**
     * 审查状态
     */
    @Expose()
    @Column({ nullable: true, default: false, name: 'censored_status' })
    censoredStatus?: boolean = false

    /**
     * 
     * @param productFlaw 
     */
    constructor(productFlaw: Partial<GoodsItem>) {
        super(productFlaw)

        if (productFlaw) {
            Object.assign(
                this,
                plainToInstance(GoodsItem, productFlaw, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}