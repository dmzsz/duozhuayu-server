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
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
  Brand,
  Category,
  Image,
  Product,
  ProductUnitSpec,
  ProductUnitSpecTmpl,
  Tag,
} from './'

/**
 * 产品单元 Standard Product Unit(SPU):标准化产品单元。
 * iphone13 小米11 基督山伯爵
 */
@Entity({
  name: 'product_units',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class ProductUnit extends IBase<ProductUnit> {

  /**
   * 产品单元的规格模板
   */
  @Expose()
  @Index("IDX_product_units_spec_emplate_id")
  @ManyToOne(() => ProductUnitSpecTmpl, tmpl => tmpl.productUnit,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'product_unit_spec_tmpl_id' })
  specTmpl: ProductUnitSpecTmpl

  /**
   * 产品单元的类型
   */
  @Expose()
  @Type(() => Category)
  @Index("IDX_product_units_category_id")
  @ManyToOne(() => Category, category => category.productUnits,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category

  @Expose()
  @Type(() => Brand)
  @Index("IDX_product_units_brand_id")
  @ManyToOne(() => Brand, brand => brand.productUnit,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'brand_id' })
  brand?: Brand

  /**
   * 拥有的具体商品
   */
  @Expose()
  @Type(() => Product)
  @OneToMany(() => Product, (product) => product.productUnit, { nullable: true })
  products?: Product[]

  @Expose()
  @Type(() => Tag)
  @ManyToMany(() => Tag, tag => tag.productUnit,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinTable({
    name: 'product_units_tags',
    joinColumn: {
      name: "product_unit_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "tag_id",
      referencedColumnName: "id"
    }
  })
  tags?: Tag[]

  /**
   *  商品的介绍图片，并不是针对具体规格的图片
   */
  @Expose()
  @Type(() => Image)
  @OneToMany(() => Image, image => image.productUnit)
  images: Image[]

  @Expose()
  @Index("IDX_product_units_name")
  @Column()
  name: string

  @Expose()
  @Index("IDX_product_units_origin_name")
  @Column({ nullable: true, name: "origin_name" })
  originalName: string

  /**
   * 出品方
   */
  // @Expose()
  // @Type(() => Producer)
  // @Index("IDX_product_units_producer_id")
  // @ManyToOne(() => Producer, producer => producer.books,
  //   { createForeignKeyConstraints: false })
  // @JoinColumn({name: 'producer_id'})
  // producer: Producer

  /**
   * 评论
   */
  // @Expose()
  // @Type(() => Comment)
  // @OneToMany(() => Comment, comment => comment.topicBook,
  //   { createForeignKeyConstraints: false })
  // comments: Comment[]

  // /**
  //  * 同一商品被用户在多个推荐中提及
  //  */
  // @Expose()
  // @Type(() => CustomerContribute)
  // @OneToMany(() => CustomerContribute, customerContribute => customerContribute.book)
  // customerContributed: CustomerContribute[]

  // @Expose()
  // @Column()
  // title: string

  // @Expose()
  // @Column({ nullable: true })
  // subTitle?: string

  // @Expose()
  // @Column({ nullable: true })
  // originalTitle?: string

  // @Expose()
  // @Column({ nullable: true })
  // language: string

  // @Expose()
  // @Column({ nullable: true })
  // description?: string

  // @Expose()
  // @Column({ nullable: true, default: false })
  // stock?: boolean

  // /**
  //  * 出版社
  //  */
  // @Expose()
  // @Column()
  // publisher: string

  // @Expose()
  // @Column()
  // publishDate: Date

  // @Expose()
  // @Column()
  // isbn13: string

  // /**
  //  * 最后上货时间
  //  */
  // @Expose()
  // @Column()
  // latestPutawayTime: Date

  // @Expose()
  // @Column()
  // author: string

  // @Expose()
  // @Column({ default: 'CNY' })
  // currencyCode: string

  // @Expose()
  // @Column({ default: 'RMB' })
  // currencySymbol: string


  // /**
  //  * 豆瓣评分
  //  */
  // @Expose()
  // @Column({ default: 0 })
  // doubanRating?: number

  // /**
  //  * goodreads评分
  //  */
  // @Expose()
  // @Column({ default: 0 })
  // goodreadsRating?: number


  /**
   * 产品单元 Standard Product Unit(SPU):标准化产品单元。
   * iphone13 小米11 基督山伯爵
   * @param productUnit 
   */
  constructor(productUnit: Partial<ProductUnit>) {
    super(productUnit)

    if (productUnit) {
      Object.assign(
        this,
        plainToInstance(ProductUnit, productUnit, {
          excludeExtraneousValues: true
        })
      )
    }
  }

}