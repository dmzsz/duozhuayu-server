import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne
} from 'typeorm'

import { Condition } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Product,
    Customer,
    LockProduct,
} from './'

@Entity({
    name: 'shopping_cart_items',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ShoppingCartItem extends IBase<ShoppingCartItem> {

    @Expose()
    @Type(() => Product)
    @Index("IDX_shopping_cart_items_product_id")
    @ManyToOne(() => Product, product => product.shoppingCartItems,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'product_id' })
    product?: Product

    @Expose()
    @Type(() => LockProduct)
    @OneToOne(() => LockProduct, lockProduct => lockProduct.shoppingCartItem,
        { createForeignKeyConstraints: false })
    lockProduct: LockProduct

    /**
     * 品相
     */
    @Expose()
    @Type(() => String)
    @Column({ type: "enum", enum: Condition, default: Condition.FINE, nullable: true })
    condition?: Condition = Condition.FINE

    @Expose()
    @Type(() => Customer)
    @Index("IDX_shopping_cart_items_customer_id")
    @ManyToOne(() => Customer, customer => customer.shoppingCartItems,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'customer_id' })
    customer?: Customer

    @Expose()
    @Column({ default: 1 })
    number?: number

    constructor(shoppingCartItem: Partial<ShoppingCartItem>) {
        super(shoppingCartItem)

        if (shoppingCartItem) {
            Object.assign(
                this,
                plainToInstance(ShoppingCartItem, shoppingCartItem, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}