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
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm'

import { IBase } from './interface/base.interface'


/**
 * 出品商
 */
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
    @Column({ nullable: true, name: 'books_count' })
    booksCount: number

    @Expose()
    @Column({ nullable: true })
    description: string

    @Expose()
    @Column()
    name: string

    /**
     * logo
     */
    @Expose()
    @Column({ nullable: true })
    image: string

    /**
     * 背景主题色
     */
    @Expose()
    @Column({ nullable: true, name: 'mask_color' })
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