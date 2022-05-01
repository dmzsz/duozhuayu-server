import { Entity, Column, OneToMany, PrimaryColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { Role } from './roles.entity'
import { Email } from './email.entity';
import { Gender } from '@/shared/enums'
import { Comment } from './comment.entity'
import { OpenCollection } from './open-collection.entity'
import { UserContribute } from './user-contribute.entity'
import { ShoppingCart } from './shopping-cart.entity'

@Entity({
	name: 'users',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class User extends IBase<User> {

	@Expose()
	@Type(() => ShoppingCart)
	@OneToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.user)
	shoppingCart?: ShoppingCart

	/**
	 * 出售的所有商品
	 */
	@Expose()
	@Type(() => Product)
	@OneToMany(() => Product, product => product.seller)
	saleProducts?: Product[]

	/**
	 * 买到的所有商品
	 */
	@Expose()
	@Type(() => Product)
	@OneToMany(() => Product, product => product.buyer)
	purchasedProducts?: Product[]

	@Expose()
	@Type(() => Email)
	@OneToMany(() => Email, email => email.fromUser)
	sendEmails?: Email[]

	@Expose()
	@Type(() => Email)
	@OneToMany(() => Email, email => email.toUser)
	receiveEmails?: Email[]

	@Expose()
	@Type(() => Comment)
	@OneToMany(() => Comment, comment => comment.createdUser)
	comments?: Comment[]

	/**
	 * 创建的书单
	 */
	@Expose()
	@Type(() => OpenCollection)
	@OneToMany(() => OpenCollection, openCollection => openCollection.proposer)
	openCollectionProposer?: OpenCollection[]

	/**
	 * 用户推荐
	 */
	@Expose()
	@Type(() => UserContribute)
	@OneToMany(() => UserContribute, userContribute => userContribute.contributor)
	userContributes?: UserContribute[]

	@Expose()
	@Type(() => Role)
	@ManyToMany(type => Role,
		role => role.users,
		{ createForeignKeyConstraints: false })
	@JoinTable({ name: 'users_roles' }) // 建立join table
	roles?: Role[]

	@Expose()
	@Column({ nullable: true })
	firstName?: string = null

	@Expose()
	@Column({ nullable: true })
	lastName?: string

	@Expose()
	@Column({ nullable: true })
	avatar?: string

	@Exclude()
	@Column({ nullable: true })
	password: string

	@Expose()
	@Column({ nullable: true })
	email?: string

	@Expose()
	@Column({ nullable: true })
	resetPasswordToken?: string

	@Expose()
	@Column({ nullable: true })
	resetPasswordExpires?: number

	// @Expose()
	// get name(): string {
	// 	return this.firstName + ' ' + this.lastName
	// }

	@Expose()
	@Column({ nullable: true })
	name?: string

	@Expose()
	get roleNames(): string[] {
		return []
		// return this.roles.map(role => role.name)
	}

	@Expose()
	@Column({ type: 'enum', enum: Gender, nullable: true }) // 不需要写 (()=>String) 数据库查询会忽略select email.gendar 字段的 造成返回gender:undefined
	gender?: Gender

	@Expose()
	@Column({ default: false, nullable: true })
	isVerified?: boolean

	@Expose()
	@Column({ default: false, nullable: true })
	isOnline?: boolean

	@Expose()
	@Column({ default: false, nullable: true })
	isLocked?: boolean

	@Expose()
	@Column({ default: false, nullable: true })
	reason?: string

	@Expose()
	@Column({ default: false, nullable: true })
	isActive?: boolean

	@Expose()
	@Column({ nullable: true })
	openid?: string

	@Expose()
	@Column({ nullable: true })
	session_key?: string

	@Expose()
	@Column({ nullable: true })
	unionid?: string

	constructor(user: Partial<User>) {
		super(user)

		if (user) {
			Object.assign(
				this,
				plainToInstance(User, user, {
					excludeExtraneousValues: true
				})
			)

			this.isVerified =
				this.isVerified !== undefined
					? this.isVerified
					: false
			this.isOnline = this.isOnline !== undefined ? this.isOnline : false
			this.isLocked = this.isLocked !== undefined ? this.isLocked : false
			this.reason = this.reason || ''
			this.isActive = this.isActive !== undefined ? this.isActive : true
		}
	}

}
