import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { File } from './interface/file.interface'
import { ImageType, ImageSize } from '@/shared/enums'
import { Product } from './product.entity'
import { OpenCollection } from './open-collection.entity'
import { Brand } from './brand.entity'
import { ProductFlaw } from './product-flaw.entity'

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
	@ManyToOne(() => Product, product => product.images,
		{ createForeignKeyConstraints: false, nullable: true })
	product?: Product

	/**
	 * 所属Brand
	 */
	@Expose()
	@Type(() => Brand)
	@ManyToOne(() => Brand, brand => brand.images,
		{ createForeignKeyConstraints: false, nullable: true })
	brand?: Brand

	/**
	 * 所属ProductFlaw
	 */
	@Expose()
	@Type(() => ProductFlaw)
	@ManyToOne(() => ProductFlaw, product => product.images,
		{ createForeignKeyConstraints: false, nullable: true })
	productFlaw?: ProductFlaw

	/**
	 * 所属OpenCollection
	 */
	@Expose()
	@Type(() => OpenCollection)
	@OneToOne(() => OpenCollection, openCollection => openCollection.openCollectionImage,
		{ createForeignKeyConstraints: false, nullable: true })
	@JoinColumn()
	openCollection?: OpenCollection

	@Expose()
	@Column({ type: 'varchar', default: ImageSize.ORIGIN })
	size: ImageSize


	/**
	 * 封皮 书背面 插图 详情介绍 商标
	 */
	@Expose()
	@Column({ type: 'varchar', default: ImageType.COVER })
	type: ImageType

	/**
	 * 图片排序, 详情照片一般都有排序的 
	 */
	@Expose()
	@Column({ nullable: true, default: 0 })
	sortNum?: number

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
