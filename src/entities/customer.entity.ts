import {
	Exclude,
	Expose,
	plainToInstance,
	Type,
} from 'class-transformer'
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryColumn,
} from 'typeorm'

import { Gender } from '@/shared/enums'
import { ProductFlaw } from '@/types/product-flaw.type';
import { IBase } from './interface/base.interface'
import {
	Address,
	AmountChangeRecord,
	Comment,
	CustomerCoupon,
	CustomerRecommendedProduct,
	Email,
	GoodsItem,
	OpenCollection,
	Order,
	Product,
	ReturnedGoodsItem,
	Role,
	ShoppingCartItem,
} from './';

@Entity({
	name: 'customers',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Customer extends IBase<Customer> {

	@Expose()
	@Type(() => Order)
	@OneToMany(() => Order, order => order.customer,
		{ createForeignKeyConstraints: false, nullable: true })
	orders?: Order[]

	/**
	 * 退货
	 */
	@Expose()
	@Type(() => ReturnedGoodsItem)
	@OneToMany(() => ReturnedGoodsItem, returnedGoodsItem => returnedGoodsItem.customer,
		{ createForeignKeyConstraints: false, nullable: true })
    returnedGoodsItems: ReturnedGoodsItem[];
	/**
	 * 购物车商品项
	 */
	@Expose()
	@Type(() => ShoppingCartItem)
	@OneToMany(() => ShoppingCartItem, shoppingCartItem => shoppingCartItem.customer,
		{ nullable: true })
	shoppingCartItems?: ShoppingCartItem[]

	/**
	 * 出售的所有商品
	 */
	@Expose()
	@Type(() => GoodsItem)
	@OneToMany(() => GoodsItem, product => product.seller,
		{ nullable: true })
	saleProducts?: GoodsItem[]

	@Expose()
	@Type(() => Email)
	@OneToMany(() => Email, email => email.fromCustomer,
		{ nullable: true })
	sendEmails?: Email[]

	@Expose()
	@Type(() => Email)
	@OneToMany(() => Email, email => email.toCustomer,
		{ nullable: true })
	receiveEmails?: Email[]

	@Expose()
	@Type(() => Comment)
	@OneToMany(() => Comment, comment => comment.createdCustomer,
		{ nullable: true })
	comments?: Comment[]

	/**
	 * 创建的书单
	 */
	@Expose()
	@Type(() => OpenCollection)
	@OneToMany(() => OpenCollection, openCollection => openCollection.proposer,
		{ nullable: true })
	openCollectionProposer?: OpenCollection[]

	/**
	 * 用户推荐记录（用户动态）
	 */
	@Expose()
	@Type(() => CustomerRecommendedProduct)
	@OneToMany(() => CustomerRecommendedProduct, customerRecommendedProduct => customerRecommendedProduct.contributor,
		{ nullable: true })
	useRecommendeds?: CustomerRecommendedProduct[]

	/**
	 * 用户推荐的商品
	 */
	@Expose()
	@Type(() => Product)
	@ManyToMany(() => Product, product => product.recommendedProductCustomers,
		{ createForeignKeyConstraints: false, nullable: true })
	// @JoinTable({
	// 	name: 'customer_recommended_products',
	// 	joinColumn: {
	// 		name: "customer_id",
	// 		referencedColumnName: "id"
	// 	},
	// 	inverseJoinColumn: {
	// 		name: "product_id",
	// 		referencedColumnName: "id"
	// 	}
	// })
	customerRecommendedProducts?: Product[]

	@Expose()
	@Type(() => Role)
	@OneToOne(type => Role,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'role_id' })
	role?: Role

	/**
	 * 充值记录
	 */
	@Expose()
	@Type(() => AmountChangeRecord)
	@OneToMany(() => AmountChangeRecord, recharge => recharge.customer,
		{ nullable: true })
	recharges?: AmountChangeRecord

	/**
	 * 优惠券
	 */
	@Expose()
	@Type(() => CustomerCoupon)
	@OneToMany(() => CustomerCoupon, customerCoupon => customerCoupon.customer,
		{ nullable: true })
	coupons?: CustomerCoupon

	/**
	 * 收货地址
	 */
	@Expose()
	@Type(() => Address)
	@OneToMany(() => Address, address => address.receivingCustomer,
		{ nullable: true })
	receivingAddresses?: Address[]

	@Expose()
	@Column({ nullable: true })
	firstName?: string = null

	@Expose()
	@Column({ nullable: true, name: 'last_name' })
	lastName?: string


	@Expose()
	@Column({ nullable: true })
	avatar?: string

	@Exclude()
	@Column({ nullable: true })
	password?: string

	@Expose()
	@Column({ nullable: true })
	email?: string

	@Expose()
	@Column({ nullable: true, name: 'reset_password_token' })
	resetPasswordToken?: string

	@Expose()
	@Column({ nullable: true, name: 'reset_password_expires' })
	resetPasswordExpires?: number

	// @Expose()
	// get name(): string {
	// 	return this.firstName + ' ' + this.lastName
	// }

	@Expose()
	@Column({ nullable: true })
	name?: string

	@Expose()
	@Column({ type: 'enum', enum: Gender, nullable: true }) // 不需要写 (()=>String) 数据库查询会忽略select email.gendar 字段的 造成返回gender:undefined
	gender?: Gender

	@Expose()
	@Column({ default: false, nullable: true, name: 'is_verified' })
	isVerified?: boolean = false

	@Expose()
	@Column({ default: false, nullable: true, name: 'is_online' })
	isOnline?: boolean = false

	@Expose()
	@Column({ default: false, nullable: true, name: 'is_locked' })
	isLocked?: boolean = false

	@Expose()
	@Column({ nullable: true })
	reason?: string

	@Expose()
	@Column({ default: false, nullable: true, name: 'is_active' })
	isActive?: boolean = false

	@Expose()
	@Column({ nullable: true, name: 'session_key' })
	sessionKey?: string

	/**
	 * 微信 openID
	 */
	@Expose()
	@Column({ nullable: true })
	openid?: string
	/**
	 * 微信unionID
	 */
	@Expose()
	@Column({ nullable: true })
	unionid?: string

	/**
	 *  余额
	 */
	@Expose()
	@Column({ nullable: true })
	balance?: number

	/**
	 * 用户
	 * @param customer 
	 */
	constructor(customer: Partial<Customer>) {
		super(customer)

		if (customer) {
			Object.assign(
				this,
				plainToInstance(Customer, customer, {
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
