import { Entity, Column, ColumnType, OneToMany, ManyToOne, OneToOne, Tree, TreeParent, TreeChildren } from 'typeorm'
import { Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { IBase } from './interface/base.interface'
import { User } from './user.entity'
import { Product } from './product.entity'
import { ProductType } from '@/shared/enums'

@Entity({
	name: 'book_comments',
	orderBy: {
		createdAt: 'ASC'
	}
})
@Tree('closure-table')
export class Comment extends IBase<Comment> {

	/**
	 * 评论所属商品
	 */
	@Expose()
	@Type(() => Product)
	@ManyToOne(() => Product, product => product.comments,
		{ createForeignKeyConstraints: false, nullable: true })
	product?: Product

	@Expose()
	@Column({ type: 'varchar' }) // 自动识别为varchar(255)
	type: ProductType

	/**
	 * 评论所属bookCollection
	 */
	// @Expose()
	// @Type(() => Product)
	// @ManyToOne(() => Product, roduct => product.comments,
	// 	{ createForeignKeyConstraints: false })
	// topicBookCollection?: Product

	/**
	* 发送者
	*/
	@Expose()
	@Type(() => User)
	@ManyToOne(() => User, user => user.comments,
		{ createForeignKeyConstraints: false })
	createdUser: User

	@Expose()
	@Type(() => Comment)
	@TreeParent()
	parent: Comment

	@Expose()
	@Type(() => Comment)
	@TreeChildren()
	children: Comment[]

	@Expose()
	@Column()
	isOpened: boolean

	@Expose()
	@Column()
	goodNum: number

	@Expose()
	@Column()
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
