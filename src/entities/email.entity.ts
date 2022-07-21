import {
	Expose,
	plainToClass,
	plainToInstance,
	Type,
} from 'class-transformer'
import {
	Column,
	ColumnType,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';

import { EmailType } from '@/shared/enums';
import { IBase } from './interface/base.interface'
import { Customer } from './';

@Entity({
	name: 'emails',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Email extends IBase<Email> {

	/**
   * 发送者
   */
	@Expose()
	@Type(() => Customer)
	@Index("IDX_emails_from_customer_id")
	@ManyToOne(() => Customer, customer => customer.sendEmails,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'from_customer_id' })
	fromCustomer?: Customer

	/**
   * 接受者
   */
	@Expose()
	@Type(() => Customer)
	@Index("IDX_emails_to_customer_id")
	@ManyToOne(() => Customer, customer => customer.receiveEmails,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'to_customer_id' })
	toCustomer?: Customer

	@Expose()
	@Column({ nullable: true, type: 'enum', enum: EmailType, default: EmailType.VERIFY_EMAIL }) // 自动识别为varchar(255)
	type: EmailType = EmailType.VERIFY_EMAIL

	@Expose()
	@Column({ nullable: true, default: false })
	@JoinColumn({ name: 'is_opened' })
	isOpened: boolean = false

	constructor(email?: Partial<Email>) {
		super(email)

		if (email) {
			Object.assign(
				this,
				plainToInstance(Email, email, {
					excludeExtraneousValues: true
				})
			)
			this.isOpened = this.isOpened || false
		}
	}
}
