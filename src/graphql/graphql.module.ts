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
// import { Customer } from '@/entities/customer.entity'
// import { DateScalar } from './scalars/date.scalar'
import { EmailResolver } from './resolvers/email.resolver'
import { AuthResolver } from './resolvers/auth.resolver'
import { CustomersResolver } from './resolvers/customer.resolver'
import { CustomerService } from './services/customer.service'
import * as Scalar from './scalars'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
// import { DateScalar, EmailTypeScalar, GenderScalar, TokenTypeScalar } from './scalars'
// import { CustomerService } from './services'
// import * as entities from '@/entities'
import * as resolvers from './resolvers'
// import { AuthResolver, EmailResolver, CustomersResolver } from './resolvers'
// import {
//   Book,
//   File,
//   Producer,
//   Role,
//   Customer,
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

    ...Object.values(resolvers),
    // EmailResolver,
    // AuthResolver,
    // CustomersResolver,
    // ...Object.values(Services),
    CustomerService,
  ],
})
export class GraphqlModule { }
