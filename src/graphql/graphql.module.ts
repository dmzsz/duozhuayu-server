import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphqlOptionsFactory } from './GraphqlOptionsFactory'
// import { Product } from '@/entities/product.entity'
// import { BookImage } from '@/entities/book-image.entity'
// import { Email } from '@/entities/email.entity'
// import { Producer } from '@/entities/producer.entity'
// import { Role } from '@/entities/roles.entity'
// import { User } from '@/entities/user.entity'
// import { DateScalar } from './scalars/date.scalar'
import { EmailResolver } from './resolvers/email.resolver'
import { AuthResolver } from './resolvers/auth.resolver'
import { UsersResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'
import * as Scalar from './scalars'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
// import { DateScalar, EmailTypeScalar, GenderScalar, TokenTypeScalar } from './scalars'
// import { UserService } from './services'
// import * as entities from '@/entities'
// import * as resolvers from './resolvers'
// import { AuthResolver, EmailResolver, UsersResolver } from './resolvers'
// import {
//   Book,
//   File,
//   Producer,
//   Role,
//   User,
//   Email,
// } from '@/entities'

/**
 * https://docs.nestjs.com/graphql/quick-start
 */
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptionsFactory,
    }),
    // TypeOrmModule.forFeature([
    //   ...Object.values(entities)
    // ])
  ],
  providers: [
    ...Object.values(Scalar),
    // EmailTypeScalar,
    // GenderScalar,
    // TokenTypeScalar,

    // ...Object.values(resolvers),
    EmailResolver,
    AuthResolver,
    UsersResolver,
    // ...Object.values(Services),
    UserService,
  ],
})
export class GraphqlModule { }
