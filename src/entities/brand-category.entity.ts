import { ChildEntity, Column, OneToOne } from 'typeorm'
import { Brand } from './brand.entity'
import { CategoryType } from '@/shared/enums'
import { Category } from './category.entity'
import { Expose, plainToInstance, Type } from 'class-transformer'

@ChildEntity()
export class BrandCategory extends Category {
    
    @Expose()
    @Type(() => Brand)
    @OneToOne(() => Brand, brand => brand.category, { nullable: true })
    brand?: Brand

    @Expose()
    @Column({ type: 'varchar', nullable: true, default: CategoryType.BRAND })
    override type?: CategoryType = CategoryType.BRAND

    constructor(category: Partial<BrandCategory>) {
        super(category)

        if (category) {
            Object.assign(
                this,
                plainToInstance(BrandCategory, category, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}