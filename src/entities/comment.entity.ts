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
	OneToOne,
	Tree,
	TreeChildren,
	TreeParent,
} from 'typeorm'

import { ProductType } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
	Customer,
	Product
} from './'

/**
 * 评价
 * 一般都是单层展示 没必要使用closure-table的方式
 */
@Entity({
	name: 'comments',
	orderBy: {
		createdAt: 'ASC'
	}
})
// @Tree('closure-table')
export class Comment extends IBase<Comment> {

	/**
	 * 评论所属商品
	 */
	@Expose()
	@Type(() => Product)
	@Index("IDX_comments_product_id")
	@ManyToOne(() => Product, product => product.comments,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'product_id' })
	product?: Product

	@Expose()
	@Column({ type: 'enum', enum: ProductType, default: ProductType.BOOK, nullable: true }) // 自动识别为varchar(255)
	type: ProductType = ProductType.BOOK

	/**
	 * 发送者
	 */
	@Expose()
	@Type(() => Customer)
	@Index("IDX_comments_created_customer_id")
	@ManyToOne(() => Customer, customer => customer.comments,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'created_customer_id' })
	createdCustomer: Customer

	// @Expose()
	// @Index()
	// @Column({ type: 'bigint', name: 'comment_id', nullable: true })
	// commentId: string

	@Expose()
	@Type(() => Comment)
	@Index("IDX_comments_parent_id")
	@ManyToOne(() => Comment, comment => comment.parent,
		{ createForeignKeyConstraints: false, nullable: true })
	// @TreeParent()
	// @JoinColumn({name: 'parent_id'})
	@JoinColumn({ name: 'parent_id'/**, referencedColumnName: 'commentId'**/ })
	parent: Comment

	@Expose()
	@Type(() => Comment)
	@OneToMany(() => Comment, comment => comment.children,
		{ nullable: true })
	// @TreeChildren()
	// @Column({name: 'comment_id'})
	// @JoinColumn({ name: 'comment_id' })
	children: Comment[]

	@Expose()
	@Column({ nullable: true, name: 'is_opened' })
	isOpened: boolean

	@Expose()
	@Column({ nullable: true, name: 'good_num' })
	goodNum: number

	@Expose()
	@Column({ nullable: true })
	badNum: number

	constructor(comment?: Partial<Comment>) {
		super(comment)

		if (comment) {
			Object.assign(
				this,
				plainToInstance(Comment, comment, {
					excludeExtraneousValues: true
				})
			)
			this.isOpened = this.isOpened || false
		}
	}
}
