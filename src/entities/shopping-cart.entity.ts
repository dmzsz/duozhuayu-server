import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { User } from './user.entity'

@Entity({
    name: 'shopping_carts',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class ShoppingCart extends IBase<ShoppingCart> {

    @Expose()
    @Type(() => Product)
    @ManyToMany(() => Product,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinTable({ name: 'shopping_carts_books' })
    books?: Product[]

    @Expose()
    @Type(() => User)
    @OneToOne(() => User,
        { createForeignKeyConstraints: false })
    @JoinColumn()
    user: User

    constructor(shoppingCart: Partial<ShoppingCart>) {
        super(shoppingCart)

        if (shoppingCart) {
            Object.assign(
                this,
                plainToInstance(ShoppingCart, shoppingCart, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}