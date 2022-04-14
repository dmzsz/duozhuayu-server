import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, TableInheritance } from 'typeorm'
import { IBase } from './interface/base.interface'
import { ProductUnit } from './product-unit.entity'
import { Comment } from './comment.entity'
import { Image } from './image.entity'
import { Brand } from './brand.entity'
import { Tag } from './tag.entity'
import { UserContribute } from './user-contribute.entity'
import { ProductSpecification } from './product-specification.entity'
import { ProductFlaw } from './product-flaw.entity'
import { Condition, LogisticsStatus, Paymentstatus, ProductStatus } from '@/shared/enums'
import { User } from './user.entity'

/**
 * 产品单元
 */
@Entity({
  name: 'products',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class Product extends IBase<Product> {

  /**
   * 卖家
   */
  @Expose()
  @Type(() => Comment)
  @ManyToOne(() => Comment, comment => comment.product,
    { createForeignKeyConstraints: false, nullable: true })
  seller?: User

  /**
   * 买家
   */
  @Expose()
  @Type(() => Comment)
  @OneToOne(() => Comment, comment => comment.product,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn()
  buyer?: User

  @Expose()
  @Type(() => ProductUnit)
  @OneToMany(() => ProductUnit, productUnit => productUnit.product,
    { nullable: true })
  productUnit?: ProductUnit

  @Expose()
  @Type(() => Brand)
  @OneToMany(() => Brand, brand => brand.product, { nullable: true })
  brand?: Brand

  @Expose()
  @Type(() => Tag)
  @ManyToMany(() => Tag,
    tag => tag.product,
    { createForeignKeyConstraints: false, nullable: true })
  tags?: Tag[]

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
  @ManyToOne(() => Comment, comment => comment.product,
    { createForeignKeyConstraints: false, nullable: true })
  comments?: Comment[]

  /**
   * 同一商品被用户在多个推荐中提及
   */
  @Expose()
  @Type(() => UserContribute)
  @OneToMany(() => UserContribute, userContribute => userContribute.product,
    { nullable: true })
  userContributed: UserContribute[]

  /**
   * 规格
   */
  @Expose()
  @Type(() => ProductSpecification)
  @OneToMany(() => ProductSpecification, productSpecification => productSpecification.product,
    { nullable: true })
  specifications?: ProductSpecification[]

  /**
   * 产品瑕疵
   */
  @Expose()
  @Type(() => ProductFlaw)
  @OneToOne(() => ProductFlaw, productFlaw => productFlaw.product,
    { nullable: true })
  flaw?: ProductFlaw

  /**
   * 电子商品型号或者'书籍'
   */
  @Expose()
  @Column({ nullable: true })
  model?: string

  /**
   * 是否已经卖出
   */
  @Expose()
  @Column({ default: false })
  isSold: boolean

  /**
   * 售价
   */
  @Expose()
  @Column()
  price: number

  /**
   * 原价
   */
  @Expose()
  @Column()
  originalPrice: number

  /**
   * 库存数量
   */
  @Expose()
  @Column({ nullable: true })
  stockNum?: number

  /**
   * 是否有库存
   */
  @Expose()
  @Column({ nullable: true, default: false })
  stock?: boolean

  /**
   * 成色
   */
  @Expose()
  @Type(() => String)
  @Column({ default: Condition.MEDIUM })
  condition?: Condition

  /**
    * 拒绝理由
    */
  @Expose()
  @Column({ nullable: true })
  refusedReason?: string

  /**
   * 预计上架日期
   */
  @Expose()
  @Column({ nullable: true })
  launchDate?: Date

  /**
   * 是否发布 默认false
   */
  @Expose()
  @Column({ nullable: true, default: false })
  isPublish?: boolean

  /**
   * 支付状态
   */
  paymentstatus: Paymentstatus
  set setPaymentstatus(value: Paymentstatus) {
    this.paymentstatus = value
    if (value == Paymentstatus.BUYER_PAYS) {

    }
  }
  paymentstatusDate: Date

  /**
   * 物流状态
   */
  logisticsStatus: LogisticsStatus

  /**
   * 商品状态
   */
  ProductStatus: ProductStatus


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