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
    Village
} from "./";

/**
 * 区/县
 */
@Entity({
    name: 'counties',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class County extends IBase<County> {

    @Expose()
    @Type(() => City)
    @Index("IDX_counties_city_id")
    @ManyToOne(() => City, city => city.counties,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'city_id' })
    city: City

    @Expose()
    @Type(() => Village)
    @OneToMany(() => Village, village => village.county,
        { createForeignKeyConstraints: false, nullable: true })
    villages?: Village[];

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
     * 国内常用城市
     * 北京 上海 广州 深圳 杭州 南京 苏州 天津 武汉 长沙 重庆 成都
     */
    isPopularCity?: boolean

    /**
    * @param county 
    */
    constructor(county?: Partial<County>) {
        super(county)

        if (county) {
            Object.assign(
                this,
                plainToInstance(County, county, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}