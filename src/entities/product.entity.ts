import {
  Expose,
  plainToInstance,
  Type
} from 'class-transformer'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  TableInheritance
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
  Comment,
  Customer,
  CustomerRecommendedProduct,
  GoodsItem,
  Image,
  OpenCollection,
  Order,
  OrderProduct,
  ProductSpecValue,
  ProductUnit,
  ShoppingCartItem,
} from './'

/**
 * 商品库存 Stock Keeping Unit（库存量单位）SKU
 * 代表着真实在库中的商品.如:白色 128G iphone13 
 */
@Entity({
  orderBy: {
    createdAt: 'ASC'
  }
})
export class Product extends IBase<Product> {

  /**
   * 购物车
   */
  @Expose()
  @Type(() => ShoppingCartItem)
  @OneToMany(() => ShoppingCartItem, shoppingCartItem => shoppingCartItem.product,
    { nullable: true })
  shoppingCartItems?: ShoppingCartItem[]

  @Expose()
  @Type(() => ProductUnit)
  @Index("IDX_products_product_unit_id")
  @ManyToOne(() => ProductUnit, productUnit => productUnit.products,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'product_unit_id' })
  productUnit?: ProductUnit


  @Expose()
  @Type(() => OrderProduct)
  @OneToMany(() => OrderProduct, order => order.product,
    { createForeignKeyConstraints: false, nullable: true })
  orderProducts?: OrderProduct[]

  /**
   * 商品的具体图片 比如轮波图
   */
  @Expose()
  @Type(() => Image)
  @OneToMany(() => Image, image => image.product,
    { nullable: true })
  images?: Image[]

  /**
   * 评论
   */
  @Expose()
  @Type(() => Comment)
  @OneToMany(() => Comment, comment => comment.product,
    { nullable: true })
  comments?: Comment[]

  /**
   * 同一商品被用户在多个推荐中提及
   */
  @Expose()
  @Type(() => CustomerRecommendedProduct)
  @OneToMany(() => CustomerRecommendedProduct, customerContribute => customerContribute.product,
    { nullable: true })
  customerRecommendedProduct: CustomerRecommendedProduct[]

  /**
  * 商品被推荐用户们
  */
  @Expose()
  @Type(() => OpenCollection)
  @ManyToMany(() => OpenCollection, customer => customer.products,
    { createForeignKeyConstraints: false, nullable: true })
  // @JoinTable({
  //   name: 'customer_recommended_products',
  //   joinColumn: {
  //     name: "product_id",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "open_collection_id",
  //     referencedColumnName: "id"
  //   }
  // })
  openCollections?: OpenCollection[]

  /**
   * 商品被推荐用户们
   */
  @Expose()
  @Type(() => Customer)
  @ManyToMany(() => Customer, customer => customer.customerRecommendedProducts,
    { createForeignKeyConstraints: false, nullable: true })
  // @JoinTable({
  //   name: 'customer_recommended_products',
  //   joinColumn: {
  //     name: "product_id",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "customer_id",
  //     referencedColumnName: "id"
  //   }
  // })
  recommendedProductCustomers: Customer[]

  /**
   * 规格
   */
  @Expose()
  @Type(() => ProductSpecValue)
  @OneToMany(() => ProductSpecValue, productSpec => productSpec.product,
    { nullable: true })
  specs?: ProductSpecValue[]

  /**
   * 库存产品
   */
  @Expose()
  @Type(() => GoodsItem)
  @OneToMany(() => GoodsItem, GoodsItem => GoodsItem.product,
    { nullable: true })
  goodsItems?: GoodsItem[]

  // /**
  //  * 电子商品型号或者'书籍'
  //  */
  // @Expose()
  // @Column({ nullable: true })
  // model?: string

  /**
   * 已经售罄 stock
   */
  @Expose()
  @Column({ nullable: true, default: false, name: 'is_sold_out' })
  isSoldOut: boolean = false

  /**
   * 原价
   */
  @Expose()
  @Column({ type: 'decimal', nullable: true, name: 'original_price' })
  originalPrice: number

  /** 全新价格
   */
  @Expose()
  @Column({ type: 'decimal', nullable: true, name: 'new_condition_price' })
  newConditionPrice: number

  /**
   * 库存数量
   */
  @Expose()
  @Column({ nullable: true, name: 'stock_num' })
  stockNum?: number

  /**
   * 预计上架日期
   */
  @Expose()
  @Column({ nullable: true, name: 'launch_date' })
  launchDate?: Date

  /**
   * 是否上架 默认false
   */
  @Expose()
  @Column({ nullable: true, default: false, name: 'is_published' })
  isPublished?: boolean = false

  constructor(product: Partial<Product>) {
    super(product)

    if (product) {
      Object.assign(
        this,
        plainToInstance(Product, product, {
          excludeExtraneousValues: true
        })
      )
    }
  }

}