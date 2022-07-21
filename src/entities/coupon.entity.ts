import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany, 
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { CategoryType } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import { CustomerCoupon } from './'

@Entity({
    name: 'coupons',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Coupon extends IBase<Coupon> {

    /**
     * 一般是一个用户领取一个
     * 也有特殊的
     */
    @Expose()
    @Type(() => CustomerCoupon)
    @OneToMany(() => CustomerCoupon, customerCoupon => customerCoupon.coupon,
        { createForeignKeyConstraints: false, nullable: true })
    customerCoupons: CustomerCoupon[]

    /**
     * 发布数量
     */
    @Expose()
    @Column()
    total: number

    /**
     * 被领取数量
     */
    @Expose()
    @Column({ nullable: true, name: 'releases_num' })
    releasesNum: number

    /**
     * 开始领取时间
     */
    @Expose()
    @Column('timestamp', { nullable: true, name: 'pick_up_at' })
    pickUpAt: Date

    /**
     * 领取截止时间
     */
    @Expose()
    @Column('timestamp', { nullable: true, name: 'pick_up_deadline_at' })
    pickUpDeadlineAt: Date

    /**
     * 使用最后期限
     * 领取后在某时间点前可以使用
     */
    @Expose()
    @Column('timestamp', { nullable: true, name: 'receive_interception_at' })
    useLastAt: Date

    /**
     * 期限 一般单位是天
     * 领取后在规定期限内使用
     */
    @Expose()
    @Column('timestamp', { nullable: true, name: 'time_limit' })
    timeLimit: number

    /**
     * 期限 一般单位是天
     */
    @Expose()
    @Column({ nullable: true, default: "day", name: 'time_limit_unit' })
    timeLimitUnit: string = "day"

    @Expose()
    @Column()
    name: string

    /**
     * 兑换码
     */
    @Expose()
    @Column({ nullable: true, name: 'redemption_code' })
    redemptionCode: string

    /**
     * 适用城市地区
     */
    @Expose()
    @Column({ nullable: true })
    region: string

    /**
     * 空：全品类
     */
    @Expose()
    @Column({
        nullable: true,
        type: "enum",
        name: "product_type",
        enum: CategoryType
    })
    productType: CategoryType

    /**
     * 金额
     */
    @Expose()
    @Column({ name: 'amount_num' })
    amountNum: number

    /**
     * 规则描述
     */
    @Expose()
    @Column({ nullable: true })
    description: string

    constructor(coupon: Partial<Coupon>) {
        super(coupon)

        if (coupon) {
            Object.assign(
                this,
                plainToInstance(Coupon, coupon, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}