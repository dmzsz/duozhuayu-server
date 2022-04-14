import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, ManyToOne } from 'typeorm'
import { IBase } from './interface/base.interface'
import { Specification } from './specification.entity'

/**
 * 属性值表
 */
@Entity({
    name: 'specifications',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class SpecificationValue extends IBase<SpecificationValue> {

    @Expose()
    @Type(() => Specification)
    @ManyToOne(() => Specification, specification => specification.specificationValue,
        { createForeignKeyConstraints: false, nullable: true })
    specification?: Specification

    @Expose()
    @Column()
    value: string

    constructor(specificationValue: Partial<SpecificationValue>) {
        super(specificationValue)

        if (specificationValue) {
            Object.assign(
                this,
                plainToInstance(SpecificationValue, specificationValue, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}