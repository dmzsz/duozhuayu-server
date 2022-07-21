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
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
  Image,
  Customer,
  CustomerRecommendedProduct,
  Product,
} from './'

/**
 * 书单
 */
@Entity({
  name: 'open_collections',
  orderBy: {
    createdAt: 'ASC'
  }
})
export class OpenCollection extends IBase<OpenCollection> {

  /**
   * 提议者
   */
  @Expose()
  @Type(() => Customer)
  @Index("IDX_open_collections_proposer_id")
  @ManyToOne(() => Customer, customer => customer.openCollectionProposer,
    { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'proposer_id' })
  proposer?: Customer

  /**
   * 推荐的商品
   */
  @Expose()
  @Type(() => Product)
  @ManyToMany(() => Product, product => product.recommendedProductCustomers,
    { createForeignKeyConstraints: false, nullable: true })
  // @JoinTable({
  //   name: 'customer_recommended_products',
  //   joinColumn: {
  //     name: "open_collection_id",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "product_id",
  //     referencedColumnName: "id"
  //   }
  // })
  products: Product[]

  /**
   * 用户推荐
   */
  @Expose()
  @OneToMany(() => CustomerRecommendedProduct, customerContribute => customerContribute.openCollection)
  customerContributes: CustomerRecommendedProduct[]

  @Expose()
  @Type(() => Image)
  @OneToOne(() => Image, image => image.openCollection,
    { createForeignKeyConstraints: false })
  openCollectionImage: Image

  @Expose()
  @Column({ nullable: true, name: 'contributors_count' })
  contributorsCount: number

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column({ nullable: true, name: 'mask_color' })
  maskColor?: string

  @Expose()
  @Column({ nullable: true })
  description?: string

  constructor(openCollection: Partial<OpenCollection>) {
    super(openCollection)

    if (openCollection) {
      Object.assign(
        this,
        plainToInstance(OpenCollection, openCollection, {
          excludeExtraneousValues: true
        })
      )
    }
  }

}