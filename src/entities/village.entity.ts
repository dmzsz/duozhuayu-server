import {
    Expose,
    plainToInstance,
    Type,
} from "class-transformer";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";

import { FirstLetter } from "@/shared/enums";
import { IBase } from "./interface/base.interface";
import {
    Address,
    City,
    County
} from "./";

/**
 * 街道/镇
 */
@Entity({
    name: 'villages',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Village extends IBase<Village> {

    @Expose()
    @Type(() => County)
    @Index("IDX_villages_county_id")
    @ManyToOne(() => County, county => county.villages,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'county_id' })
    county?: County

    @Expose()
    @Type(() => Address)
    @OneToMany(() => Address, address => address.county,
        { createForeignKeyConstraints: false, nullable: true })
    addresses: Address;

    @Expose()
    @Column()
    name: string

    /**
     * 首字母
     */
    @Expose()
    @Column({ type: 'enum', enum: FirstLetter, name: 'first_letter' })
    firstLetter: FirstLetter

    /**
    * @param village 
    */
    constructor(village?: Partial<Village>) {
        super(village)

        if (village) {
            Object.assign(
                this,
                plainToInstance(Village, village, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}