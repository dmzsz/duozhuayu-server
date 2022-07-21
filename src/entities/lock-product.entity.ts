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
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
} from 'typeorm'

import {
    Condition,
    LockProductPaySatus,
    LockProductStatus,
    PaymentStatus,
    PaymentType,
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Product,
    Customer,
    ShoppingCartItem,
} from './'
import e from 'express'

@Entity({
    name: 'lock_products',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class LockProduct extends IBase<LockProduct> {

    @Expose()
    @Type(() => ShoppingCartItem)
    @OneToOne(() => ShoppingCartItem, shoppingCartItem => shoppingCartItem.lockProduct,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: "shopping_cart_item_id" })
    shoppingCartItem: ShoppingCartItem

    /**
     * 商品
     * 冗余数据 方便查询
     */
    @Expose()
    @Column({ type: 'bigint', name: 'product_id' })
    productId: string

    /**
     * 品相
     * 冗余数据 方便查询
     */
    @Expose()
    @Type(() => String)
    @Column({ type: "enum", enum: Condition, default: Condition.FINE, nullable: true })
    condition?: Condition = Condition.FINE

    /**
     * 锁定价格 = 商品费用
     */
    @Expose()
    @Column({ type: 'decimal', name: 'lock_fee' })
    lockFee: number

    /**
     * 支付状态
     */
    @Expose()
    @Column({ type: 'enum', enum: LockProductPaySatus, default: LockProductPaySatus.PENDING_PAYMENT })
    payStatus?: LockProductPaySatus

    /**
     * 扣款比例 默认10%
     */
    @Expose()
    @Column({ type: 'float', name: 'deduction_ratio', default: 0.1 })
    deductionRatio?: number

    /**
     * 最高扣款金额 默认10元
     */
    @Expose()
    @Column({ type: 'decimal', name: 'debit_limit', default: 10 })
    debitLimit?: number

    /**
     * 支付方式
     */
    @Expose()
    @Column({ type: 'enum', enum: PaymentType, nullable: true, name: 'payment_type' })
    paymentType: PaymentType

    /**
     * 在未付款之前 为空
     */
    @Expose()
    @Column({ type: 'enum', enum: LockProductStatus, nullable: true})
    status?: LockProductStatus

    /**
     * 
     * @param shoppingCartItem 
     */
    constructor(shoppingCartItem: Partial<LockProduct>) {
        super(shoppingCartItem)

        if (shoppingCartItem) {
            Object.assign(
                this,
                plainToInstance(LockProduct, shoppingCartItem, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}