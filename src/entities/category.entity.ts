import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, OneToOne, TableInheritance, Tree, TreeChildren, TreeParent } from 'typeorm'
import { IBase } from './interface/base.interface'
import { CategoryType } from '@/shared/enums'
import { ProductUnit } from './product-unit.entity'

@Entity({
    name: 'categories',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree('closure-table')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Category extends IBase<Category> {

    @Expose()
    @Type(() => ProductUnit)
    @OneToOne(() => ProductUnit, product => product.category, { nullable: true })
    productUnit?: ProductUnit

    @Expose()
    @Type(() => Category)
    @TreeParent()
    parent: Category

    @Expose()
    @Type(() => Category)
    @TreeChildren()
    children: Category[]

    @Expose()
    @Type(() => Category)
    @Column({ default: 1 })
    depth: number

    @Expose()
    @Column()
    name: string

    @Expose()
    @Type(() => String)
    @Column({ type: 'varchar', nullable: true })
    type?: CategoryType

    constructor(category: Partial<Category>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(Category, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}

function DiscriminatorColumn(arg0: { name: string; type: string }) {
    throw new Error('Function not implemented.')
}
