import { IBase } from './interface/base.interface';
import { Gender, RoleOptions } from '@/shared/enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer';
import { Email } from './email.type';
import { OpenCollection } from './open-collection.type';
import { Role } from './role.type';
import { Comment } from './comment.type';
import { ShoppingCart } from './shoping-cart.type';
import { CustomerContribute } from './customer-contribute.type';
import { Book } from './book.type';
import { Clothing } from './clothing.type';
import { Electronics } from './electronics.type';

@ObjectType({
	implements: () => [IBase],
})
export class Customer extends IBase<Customer> {
	@Expose()
	@Type(() => ShoppingCart)
	@Field(type => ShoppingCart, { nullable: true })
	shoppingCart?: ShoppingCart

	@Expose()
	@Type(() => Email)
	@Field(type => [Email], { nullable: true })
	sendEmails?: Email[]

	@Expose()
	@Type(() => Email)
	@Field(type => [Email], { nullable: true })
	receiveEmails?: Email[]

	@Expose()
	@Type(() => Comment)
	@Field(type => [Comment], { nullable: true })
	comments?: Comment[]

	@Expose()
	@Type(() => Book)
	@Field(type => [Book], { nullable: true })
	books?: Book[]

	@Expose()
	@Type(() => Clothing)
	@Field(type => [Clothing], { nullable: true })
	clothings?: Clothing[]


	@Expose()
	@Type(() => Electronics)
	@Field(type => [Electronics], { nullable: true })
	electronics?: Electronics[]

	/**
	 * 创建的书单
	 */
	@Expose()
	@Type(() => OpenCollection)
	@Field(type => [OpenCollection], { nullable: true })
	openCollectionProposer?: OpenCollection[]

	/**
	 * 用户推荐
	 */
	@Expose()
	@Type(() => CustomerContribute)
	@Field(type => [CustomerContribute], { nullable: true })
	customerContributes?: CustomerContribute[]

	@Expose()
	@Type(() => Role)
	@Field(type => Role, { nullable: true, defaultValue: [RoleOptions.USER] })
	roles?: Role[]

	@Expose()
	@Field({ nullable: true })
	firstName?: string = null

	@Expose()
	@Field({ nullable: true })
	lastName?: string

	@Expose()
	@Field({ nullable: true })
	avatar?: string

	@Exclude()
	@Field({ nullable: true })
	password?: string


	@Expose()
	@Field({ nullable: true })
	email?: string

	@Expose()
	@Field({ nullable: true })
	resetPasswordToken?: string

	@Expose()
	@Field({ nullable: true })
	resetPasswordExpires?: number

	// @Expose()
	// get name(): string {
	// 	return this.firstName + ' ' + this.lastName
	// }

	@Expose()
	@Field({ nullable: true })
	name?: string

	@Expose()
	@Field(()=> [String])
	get roleNames(): string[] {
		return []
		// return this.roles.map(role => role.name)
	}

	@Expose()
	@Field(() => Gender, {nullable: true})
	gender?: Gender

	@Expose()
	@Field({ nullable: true })
	isVerified: boolean

	@Expose()
	@Field({ nullable: true })
	isOnline: boolean

	@Expose()
	@Field({ nullable: true })
	isLocked: boolean

	@Expose()
	@Field({ nullable: true })
	reason?: string

	@Expose()
	@Field({ nullable: true })
	isActive: boolean

	@Expose()
	@Field({ nullable: true })
	openid?: string

	@Expose()
	@Field({ nullable: true })
	session_key?: string

	@Expose()
	@Field({ nullable: true })
	unionid?: string

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