import { Entity, Column, ColumnType, OneToMany, ManyToOne } from 'typeorm';
import { Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { IBase } from './interface/base.interface'
import { User } from './user.entity';
import { EmailType } from '@/shared/enums';

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
	@Type(() => User)
	@ManyToOne(() => User, user => user.sendEmails,
		{ createForeignKeyConstraints: false })
	fromUser: User

	/**
   * 接受者
   */
	@Expose()
	@Type(() => User)
	@ManyToOne(() => User, user => user.receiveEmails,
		{ createForeignKeyConstraints: false })
	toUser: User

	@Expose()
	@Column({ nullable: true, type: 'varchar', default: EmailType.VERIFY_EMAIL }) // 自动识别为varchar(255)
	type: EmailType

	@Expose()
	@Column({ nullable: true, default: false })
	isOpened: boolean

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
