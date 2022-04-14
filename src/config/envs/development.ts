import { ApolloDriverConfig } from '@nestjs/apollo'

let graphql: ApolloDriverConfig = {
  plugins: [
    require('apollo-tracing').plugin()
  ]
}
export const config = {
  db: {
    name: 'default',
    type: process.env.db_type || 'mysql',
    // https://typeorm.io/#/connection-options/common-connection-options
    synchronize: true,
    logging: true,
    host: process.env.db_host || '127.0.0.1',
    port: process.env.db_port || 3306,
    username: process.env.db_user || 'root',
    password: process.env.db_password || 'root123456',
    database: process.env.db_name || 'test',
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true, // nest 提供的属性
    keepConnectionAlive: true,
    retryAttempts: 2,
    retryDelay: 1000,
    // entities: [`${__dirname}/src/entities/*.entity.{js,ts}`], // linux 和 windows 在webpack 模式下路径有差距 还是使用 TypeOrmModule.forFeature比较好
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migrations/**/*.{js,ts}`],
    // cli: {
    //   'migrationsDir': `${__dirname}/../../migrations`
    // }
  },
  foo: 'dev-bar',
  graphql: Object.assign(
    graphql,
    { graphql_depth_limit: +process.env.graphql_depth_limit || 3 }
  ),
}
