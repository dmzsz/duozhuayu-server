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
	OneToMany,
	OneToOne,
	Unique,
} from 'typeorm'

import { ImageType, ImageSize } from '@/shared/enums'
import { File } from './interface/file.interface'
import {
	Brand,
	Category,
	GoodsItem,
	OpenCollection,
	Product,
	ProductUnit,
} from './'

@Entity({
	name: 'images',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Image extends File {

	/**
	 * 所属product
	 */
	@Expose()
	@Type(() => Product)
	@Index("IDX_images_product_id")
	@ManyToOne(() => Product, product => product.images,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'product_id' })
	product?: Product

	/**
	 * 所属product
	 */
	@Expose()
	@Type(() => ProductUnit)
	@Index("IDX_images_product_unit_id")
	@ManyToOne(() => ProductUnit, productUnit => productUnit.images,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'product_unit_id' })
	productUnit?: ProductUnit

	/**
	 * 所属Brand
	 */
	@Expose()
	@Type(() => Brand)
	@Index("IDX_images_brand_id")
	@ManyToOne(() => Brand, brand => brand.images,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'brand_id' })
	brand?: Brand

	/**
	 * 所属GoodsItem
	 */
	@Expose()
	@Type(() => GoodsItem)
	@Index("IDX_images_goods_item_id")
	@ManyToOne(() => GoodsItem, goodsItem => goodsItem.flawImages,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'goods_item_id' })
	goodsItem?: GoodsItem

	@Expose()
	@Type(() => Category)
	@OneToMany(() => Category, category => category.image,
		{ nullable: true })
	categories: Category[]

	/**
	 * 所属OpenCollection
	 */
	@Expose()
	@Type(() => OpenCollection)
	@Index("IDX_images_open_collection_id")
	@OneToOne(() => OpenCollection, openCollection => openCollection.openCollectionImage,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn({ name: 'open_collection_id' })
	openCollection?: OpenCollection

	@Expose()
	@Column({ type: 'enum', enum: ImageSize, default: ImageSize.ORIGIN, nullable: true })
	size?: ImageSize = ImageSize.ORIGIN

	// 长宽比
	@Expose()
	@Column({ type: 'float', nullable: true, name: 'image_ratio', scale: 2 })
	imageRatio?: number

	/**
	 * 封皮 书背面 插图 详情介绍 商标
	 */
	@Expose()
	@Column({ type: 'enum', enum: ImageType, nullable: true })
	type?: ImageType

	/**
	 * 图片排序, 详情照片一般都有排序的 
	 */
	@Expose()
	@Column({ nullable: true, default: 0, name: 'sort_num' })
	sortNum?: number = 0

	constructor(image?: Partial<Image>) {
		super(image)

		if (image) {
			Object.assign(
				this,
				plainToInstance(Image, image, {
					excludeExtraneousValues: true
				})
			)
		}
	}
}
