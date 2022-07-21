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
    ManyToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import { Customer } from './';

/**
 * 账户金额变化记录
 */
@Entity({
    name: 'amount_change_records',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class AmountChangeRecord extends IBase<AmountChangeRecord> {

    @Expose()
    @Index("IDX_amount_change_records_customer_id")
    @ManyToOne(() => Customer, customer => customer.recharges,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer

    /**
     * 正数：充值
     * 负数：提现或者消费
     */
    @Expose()
    @Column({ nullable: true })
    value: number

    @Expose()
    @Column({ nullable: true })
    from: string

    constructor(record: Partial<AmountChangeRecord>) {
        super(record)

        if (record) {
            Object.assign(
                this,
                plainToInstance(AmountChangeRecord, record, {
                    excludeExtraneousValues: true
                })
            )


        }
    }
}