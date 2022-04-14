import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'


@Entity({
    name: 'producers',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Producer extends IBase<Producer> {

    // @Expose()
    // @Type(() => Product)
    // @OneToMany(() => Product, product => product.producer)
    // books: Product[]

    /**
     * 总出品书数量
     */
    @Expose()
    @Column()
    booksCount: number

    @Expose()
    @Column()
    description: string

    @Expose()
    @Column()
    name: string

    /**
     * logo
     */
    @Expose()
    @Column()
    image: string

    /**
     * 背景主题色
     */
    @Expose()
    @Column()
    maskColor: string

    // tagType: TagType

    constructor(producer: Partial<Producer>) {
        super(producer)

        if (producer) {
            Object.assign(
                this,
                plainToInstance(Producer, producer, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}