import { ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

let graphql: ApolloDriverConfig = {
  autoSchemaFile: join(process.cwd(), './src/schema.graphql'), // './schema.graphql'
  autoTransformHttpErrors: true,
  debug: false,
  installSubscriptionHandlers: true,
  path: 'graphql',
  playground: false,
  sortSchema: true,
}

export const config = {
  db: {
    type: process.env.db_type || 'mysql',
    synchronize: false,
    logging: false,
    replication: {
      master: {
        host: process.env.db_host || 'localhost',
        port: process.env.db_port || 3306,
        username: process.env.db_user || 'root',
        password: process.env.db_password || 'root123456',
        database: process.env.db_name || 'test',
      },
      slaves: [{ // fix if necessary
        host: 'slaveHost',
        port: 3306,
        username: 'username',
        password: 'password',
        database: 'dbname',
      }],
    },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
    entities: [`${__dirname}/**/entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/**/subscriber/**/*.{js,ts}`],
    migrations: [`${__dirname}/**/migration/**/*.{js,ts}`],
  },
  graphql: graphql,
  foo: 'pro-bar',
}
