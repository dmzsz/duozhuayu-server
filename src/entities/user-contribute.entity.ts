import { Entity, Column, ManyToOne, Index } from 'typeorm'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { User } from './user.entity'
import { OpenCollection } from './open-collection.entity'
import { ProductType } from '@/shared/enums'

/**
 * 用户推荐（发表的动态）
 */
@Entity({
	name: 'user_contributes',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class UserContribute extends IBase<UserContribute> {

	/**
	 * 贡献者 管理员创建的时候可能为空
	 */
	@Expose()
	@Type(() => User)
	@ManyToOne(() => User, user => user.userContributes,
		{ createForeignKeyConstraints: false, nullable: true })
	contributor: User

	/**
	 * 每次推荐一个商品（主要是图书）， 因为要写理由
	 */
	@Expose()
	@Type(() => Product)
	@Index(() => [Product, OpenCollection])
	@ManyToOne(() => Product, Product => Product.userContributed,
		{ createForeignKeyConstraints: false })
	product: Product

	/**
	 * 书单
	 */
	@Expose()
	@Type(() => OpenCollection)
	@ManyToOne(() => OpenCollection, openCollection => openCollection.userContributes,
		{ createForeignKeyConstraints: false })
	openCollection: OpenCollection

	/**
	 * 推荐理由
	 */
	@Expose()
	@Column()
	reason: string

	@Expose()
	@Column({ type: 'enum', enum: ProductType, default: ProductType.BOOK })
	type: ProductType

	constructor(userContribute: Partial<UserContribute>) {
		super(userContribute)

		if (userContribute) {
			Object.assign(
				this,
				plainToInstance(UserContribute, userContribute, {
					excludeExtraneousValues: true
				})
			)
		}
	}
}
