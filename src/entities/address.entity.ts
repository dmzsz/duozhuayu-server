import {
    Exclude,
    Expose,
    plainToClass,
    plainToInstance,
    Type,
} from 'class-transformer'
import { IsArray } from 'class-validator'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm'
import {
    Geometry,
    Point,
} from 'geojson';

import {
    Condition,
    FlawReasons,
    AddressType,
} from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    City,
    County,
    Customer,
    Employee,
    GoodsItem,
    Image,
    OrderProduct,
    Procurement,
    Product,
    Province,
    Supplier,
    Village,
    Warehouse,
} from '.'

/**
 * 地址
 */
@Entity({
    name: 'addresses',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Address extends IBase<Address> {

    /**
     * 所在省份/地区
     */
    @Expose()
    @Type(() => Province)
    @Index("IDX_addresses_province_id")
    @ManyToOne(() => Province, province => province.addresses,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'province_id' })
    province?: Province

    /**
     * 所在城市
     */
    @Expose()
    @Type(() => City)
    @Index("IDX_addresses_city_id")
    @ManyToOne(() => City, city => city.addresses,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'city_id' })
    city?: City

    /**
     * 区/县
     */
    @Expose()
    @Type(() => County)
    @Index("IDX_addresses_county_id")
    @ManyToOne(() => County, county => county.addresses,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'county_id' })
    county?: County

    /**
     * 街道/镇
     */
    @Expose()
    @Index("IDX_addresses_village_id")
    @ManyToOne(() => Village, village => village.addresses,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'village_id' })
    village?: Village

    /**
     * 收货客户
     */
    @Type(() => Customer)
    @ManyToOne(() => Customer, customer => customer.receivingAddresses,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'customer_id' })
    receivingCustomer: Customer

    /**
     * 详细地址
     */
    @Expose()
    @Column({ nullable: true, name: 'detailed_address' })
    detailedAddress?: string

    /**
     * 默认退货地址
     */
    @Expose()
    @Column({ nullable: true, name: 'is_return_address', default: false })
    isReturnAddress?: boolean

    /**
     * 默认收货地址
     */
    @Expose()
    @Column({ nullable: true, name: 'is_receiving_address', default: false })
    isReceivingAddress?: boolean

    /**
     * 默认收票地址
     */
    @Expose()
    @Column({ nullable: true, name: 'is_ticket_address', default: false })
    isTicketAddress?: boolean

    @Expose()
    @Index({ spatial: true })
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: Point

    /**
     * 
     * @param address 
     */
    constructor(address: Partial<Address>) {
        super(address)

        if (address) {
            Object.assign(
                this,
                plainToInstance(Address, address, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}