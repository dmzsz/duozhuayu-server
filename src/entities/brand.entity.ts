import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { BrandCategory } from './brand-category.entity'
import { Image } from './image.entity'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { ObjectType } from '@nestjs/graphql'

@Entity({
    name: 'brands',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Brand extends IBase<Brand> {

    @Expose()
    @Type(() => Product)
    @OneToMany(() => Product, product => product.brand,
        { nullable: true })
    product?: Product[]

    @Expose()
    @Type(() => BrandCategory)
    @OneToOne(() => BrandCategory, category => category.brand,
        { nullable: true })
    @JoinColumn()
    category: BrandCategory

    @Expose()
    @Type(() => Image)
    @OneToMany(() => Image, image => image.brand,
        { nullable: true })
    images: Image[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ nullable: true })
    chineseTitle: string

    /**
     * 简介
     */
    @Expose()
    @Column({ nullable: true })
    intro: string

    constructor(tag: Partial<Brand>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Brand, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}