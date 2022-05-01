import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, TableInheritance } from 'typeorm'
import { Brand } from './brand.entity'
import { Category } from './category.entity'
import { IBase } from './interface/base.interface'
import { ProductUnitCategory } from './product-unit-category.entity'
import { Product } from './product.entity'
import { Specification } from './specification.entity'
import { Tag } from './tag.entity'
import { Image } from './image.entity'

/**
 * 产品单元 品类 同一品类有相同属性只是属性的值不同而已
 */
@Entity({
  name: 'product_units',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class ProductUnit extends IBase<ProductUnit> {

  /**
   * 产品单元的属性
   */
  @Expose()
  @Type(() => Specification)
  @ManyToMany(() => Specification, (specification) => specification.productUnit)
  specifications: Specification[]

  /**
   * 产品单元的类型
   */
  @Expose()
  @Type(() => ProductUnitCategory)
  @ManyToOne(() => ProductUnitCategory, category => category.productUnit,
    { nullable: true })
  category?: ProductUnitCategory

  @Expose()
  @Type(() => Brand)
  @OneToMany(() => Brand, brand => brand.productUnit, { nullable: true })
  brand?: Brand

  /**
   * 拥有的具体商品
   */
  @Expose()
  @Type(() => Product)
  @OneToMany(() => Product, (product) => product.productUnit)
  product: Product

  @Expose()
  @Type(() => Tag)
  @ManyToMany(() => Tag, tag => tag.productUnit,
    { createForeignKeyConstraints: false, nullable: true })
  tags?: Tag

  @Expose()
  @Type(() => Image)
  @OneToMany(() => Image, image => image.productUnit)
  images: Image[]

  /**
   * 出品方
   */
  // @Expose()
  // @Type(() => Producer)
  // @ManyToOne(() => Producer, producer => producer.books,
  //   { createForeignKeyConstraints: false })
  // producer: Producer

  /**
   * 评论
   */
  // @Expose()
  // @Type(() => Comment)
  // @ManyToOne(() => Comment, comment => comment.topicBook,
  //   { createForeignKeyConstraints: false })
  // comments: Comment[]

  // /**
  //  * 同一商品被用户在多个推荐中提及
  //  */
  // @Expose()
  // @Type(() => UserContribute)
  // @OneToMany(() => UserContribute, userContribute => userContribute.book)
  // userContributed: UserContribute[]

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