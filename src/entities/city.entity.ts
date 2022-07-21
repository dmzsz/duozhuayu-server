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
    County,
    Province
} from "./";

/**
 * 城市
 */
@Entity({
    name: 'cities',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class City extends IBase<City> {

    @Expose()
    @Type(() => Province)
    @Index("IDX_cities_province_id")
    @ManyToOne(() => Province, province => province.cities,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'province_id' })
    province?: Province

    @Expose()
    @Type(() => County)
    @OneToMany(() => County, county => county.city,
        { createForeignKeyConstraints: false, nullable: true })
    counties?: County[];

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
    * @param city 
    */
    constructor(city?: Partial<City>) {
        super(city)

        if (city) {
            Object.assign(
                this,
                plainToInstance(City, city, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}