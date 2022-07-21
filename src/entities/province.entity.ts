import { Area } from "@/shared/enums/address.enum";
import {
    Expose,
    plainToInstance,
    Type,
} from "class-transformer";
import {
    Column,
    Entity,
    OneToMany,
    Unique
} from "typeorm";

import { FirstLetter } from "@/shared/enums";
import { IBase } from "./interface/base.interface";
import { Address, City } from "./";

/**
 * 省份/地区 包含省和直辖市
 */
@Entity({
    name: 'provinces',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Unique("UNI_provinces_name", ['name'])
export class Province extends IBase<Province> {

    @Expose()
    @Type(() => City)
    @OneToMany(() => City, city => city.province,
        { createForeignKeyConstraints: false, nullable: true })
    cities?: City[];

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

    @Expose()
    @Column({ type: 'enum', enum: Area, default: Area.CHINA_MAINLAND })
    area: Area = Area.CHINA_MAINLAND 
    
    /**
    * @param province 
    */
    constructor(province?: Partial<Province>) {
        super(province)

        if (province) {
            Object.assign(
                this,
                plainToInstance(Province, province, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}