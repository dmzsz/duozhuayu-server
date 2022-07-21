import {
	Exclude,
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

import { ProductType } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
	Customer,
	Product,
	OpenCollection,

} from './'

/**
 * 用户推荐记录（发表的动态）
 */
@Entity({
	name: 'customer_recommended_products',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class CustomerRecommendedProduct extends IBase<CustomerRecommendedProduct> {

	/**
	 * 贡献者 管理员创建的时候可能为空
	 */
	@Expose()
	@Type(() => Customer)
	@Index("IDX_customer_recommended_products_contributor_id")
	@ManyToOne(() => Customer, customer => customer.useRecommendeds,
		{ createForeignKeyConstraints: false })
	@JoinColumn({ name: 'contributor_id' })
	contributor?: Customer

	// @Expose()
	// @Column({ nullable: true, name: 'contributor_id' })
	// contributorId?: number

	/**
	 * 每次推荐一个商品（主要是图书）， 因为要写理由
	 * 图书和书单 是组合主键
	 */
	@Expose()
	@Type(() => Product)
	@Index("IDX_customer_recommended_products_product_id")
	@ManyToOne(() => Product, product => product.customerRecommendedProduct,
		{ createForeignKeyConstraints: false, nullable: false })
	@JoinColumn({ name: 'product_id' })
	product: Product

	// @Expose()
	// @Column({ nullable: true, name: 'product_id' })
	// productId?: number

	/**
	 * 书单
	 */
	@Expose()
	@Type(() => OpenCollection)
	@Index("IDX_customer_recommended_products_open_collection_id")
	@ManyToOne(() => OpenCollection, openCollection => openCollection.customerContributes,
		{ createForeignKeyConstraints: false })
	@JoinColumn({ name: 'open_collection_id' })
	openCollection: OpenCollection

	// @Expose()
	// @Column({ nullable: true, name: 'open_collection_id' })
	// openCollectionId?: number
	/**
	 * 推荐理由
	 */
	@Expose()
	@Column({ nullable: true })
	reason: string

	@Expose()
	@Column({ nullable: true, type: 'enum', enum: ProductType, default: ProductType.BOOK })
	type: ProductType = ProductType.BOOK

	constructor(customerContribute: Partial<CustomerRecommendedProduct>) {
		super(customerContribute)

		if (customerContribute) {
			Object.assign(
				this,
				plainToInstance(CustomerRecommendedProduct, customerContribute, {
					excludeExtraneousValues: true
				})
			)
		}
	}
}
