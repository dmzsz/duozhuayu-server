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
 * 采购项目
 */
@Entity({
    name: 'procurements',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Procurement extends IBase<Procurement> {

    @Expose()
    @Type(() => Product)
    @Index('IDX_procurements_product_id')
    @ManyToOne(() => Product, product => product.goodsItems,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'product_id' })
    product: Product

    /**
     * 采购数量
     */
    @Expose()
    @Column({ name: 'purchase_number' })
    purchaseNumber: number

    /**
     * 实际受到数量
     */
    @Expose()
    @Column({ nullable: true, name: 'actual_number' })
    actualNumber?: number

    /**
     * 购入单价
     */
    @Expose()
    @Column({ type: 'decimal', nullable: true, name: 'in_price' })
    inPrice?: number

    /**
     * 零售价建议单价(原价)
     */
    @Expose()
    @Column({ type: 'decimal', nullable: true, name: 'original_price' })
    originalPrice?: number

    /**
     * 优惠折扣
     */
    @Expose()
    @Column({ type: "float", nullable: true })
    discount: number

    /**
     * 税率
     */
    @Expose()
    @Column({ type: "float", nullable: true, name: 'out_price' })
    taxRate: number

    /**
     * 品相 一般采购的都是全新
     */
    @Expose()
    @Type(() => String)
    @Column({ type: 'enum', enum: Condition, default: Condition.FINE, nullable: true })
    condition?: Condition = Condition.FINE

    // /**
    //  * 结算方式
    //  */
    // @Expose()
    // @Type(() => String)
    // @Column({ type: 'enum', enum: Condition, default: Condition.FINE, nullable: true })
    // settlementMethod: 

    /**
     * 
     * @param procurement 
     */
    constructor(procurement: Partial<Procurement>) {
        super(procurement)

        if (procurement) {
            Object.assign(
                this,
                plainToInstance(Procurement, procurement, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}