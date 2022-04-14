import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'

@Entity({
    name: 'tags',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Tag extends IBase<Tag> {

    @Expose()
    @Type(() => Product)
    @ManyToMany(() => Product, product => product.tags,
        { createForeignKeyConstraints: false })
    @JoinTable({ name: 'products_tags' })
    product: Product[]

    @Expose()
    @Column()
    name: string

    /**
     * 主题颜色
     */
    @Expose()
    @Column()
    maskColor: string
    /**
     * 描述
     */
    @Expose()
    @Column()
    description: string

    constructor(tag: Partial<Tag>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Tag, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}