// export * from './development'
export const config = {
  db: {
    type: process.env.db_type,
    synchronize: false,
    logging: false,
    host: process.env.db_host || '127.0.0.1',
    port: process.env.db_port || 3306,
    username: process.env.db_user || 'username',
    password: process.env.db_password || 'password',
    database: process.env.db_name || 'dbname',
    extra: {
      connectionLimit: 5,
    },
    autoLoadEntities: true,
    // entities: [`${__dirname}/../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../migration/**/*.{js,ts}`],
  },
  graphql: {
    playground: false,
  },
}
