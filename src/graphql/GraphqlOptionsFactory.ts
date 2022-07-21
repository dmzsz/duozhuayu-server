import { ConsoleLogger, Injectable, Logger } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import { MockList } from '@graphql-tools/mock'

import type { Production } from '@/config/config.interface'
import { ConfigService } from '@nestjs/config'
import { ApolloDriver, ApolloDriverAsyncConfig, ApolloDriverConfig } from '@nestjs/apollo'
import { PubSub } from 'graphql-subscriptions'
import { Default } from '../config/config.interface'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { directives } from '@/graphql/directives'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'

// const gateway = new ApolloGateway({
// 	serviceList: [
// 		{ name: 'accounts', url: 'http://localhost:11041/graphql' },
// 		{ name: 'reviews', url: 'http://localhost:14042/graphql' },
// 		{ name: 'products', url: 'http://localhost:11043/graphql' },
// 		{ name: 'inventory', url: 'http://localhost:11044/graphql' }
// 	]
// })

const pubsub = new PubSub()

@Injectable()
export class GraphqlOptionsFactory implements GqlOptionsFactory {

  constructor(private readonly configService: ConfigService) {
  }

  createGqlOptions(): ApolloDriverConfig {
    let node_env = process.env.node_env
    const graphqlConfig: Production['graphql'] = this.configService.get<Production['graphql']>('graphql')
    const corslConfig: Default['cors'] = this.configService.get<Default['cors']>('cors')

    return {
      driver: ApolloDriver,
      // fieldResolverEnhancers: [],
      autoSchemaFile: graphqlConfig!.autoSchemaFile, // code first自动生成schema.graphql位置
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
        numberScalarMode: 'integer',
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
      // cors: corslConfig.enabled && node_env === 'production' ?
      //   { credentials: corslConfig.credentials, origin: corslConfig.origin, } :
      //   {
      //     origin: corslConfig.origin,
      //     credentials: false
      //   },
      debug: graphqlConfig!.debug,
      installSubscriptionHandlers: true,
      playground: graphqlConfig!.playground,
      sortSchema: graphqlConfig!.sortSchema,
      // resolvers: {
        // JSON: GraphQLJSON,
        // JSONObject: GraphQLJSONObject
      // },
      mocks: node_env === 'testing' && {
        // String: () => 'Chnirt',
        Query: () => ({
          customers: () => new MockList([2, 6])
        })
      },
      context: ({ req, res, connection }: any) => ({ req, res, pubsub }),
      formatError: (error) => {
        const { message, extensions, path } = error

        if (extensions?.['exception']?.['status'] === 500) {
          return {
            locations: error.locations,
            message: extensions?.['exception']?.['message'] || message,
            path: path,
            extensions: {
              code: extensions?.['code'],
              status: extensions?.['exception']?.['status'],
              biz: {
                code: extensions?.['exception']?.['response']?.['code'],
                message: extensions?.['exception']?.['response']?.['msg'],
              },
            },
          }
        } else {
          return {
            locations: error.locations,
            message: extensions?.['response']?.['message'] || message,
            path: path,
            extensions: {
              code: extensions?.['code'],
              status: extensions?.['response']?.['statusCode'],
            },
          }
        }
      },
      formatResponse: response => {
        return response
      },
      transformSchema: schema => directives(schema),
      // plugins: [!graphqlConfig!.playground && ApolloServerPluginLandingPageLocalDefault()],
    }
  }
}
