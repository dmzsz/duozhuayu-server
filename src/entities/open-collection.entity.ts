import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { IBase } from './interface/base.interface'
import { Image } from './image.entity'
import { User } from './user.entity'
import { UserContribute } from './user-contribute.entity'

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
  @Type(() => User)
  @ManyToOne(() => User, user => user.openCollectionProposer,
    { createForeignKeyConstraints: false })
  proposer?: User

  /**
   * 贡献者
   */
  @Expose()
  @Type(() => UserContribute)
  @OneToMany(() => UserContribute, userContribute => userContribute.contributor)
  contributors?: UserContribute[]

  /**
   * 推荐图书
   */
  @Expose()
  @Type(() => UserContribute)
  @OneToMany(() => UserContribute, userContribute => userContribute.product)
  books: UserContribute[]

  /**
   * 用户推荐
   */
  @Expose()
  @OneToMany(() => UserContribute, userContribute => userContribute.openCollection)
  userContributes: UserContribute[]

  @Expose()
  @Type(() => Image)
  @OneToOne(() => Image, image => image.openCollection)
  openCollectionImage: Image

  @Expose()
  @Column()
  contributorsCount: number

  @Expose()
  @Column()
  name: string

  @Expose()
  @Column({ nullable: true })
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