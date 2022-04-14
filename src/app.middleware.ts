import { ConfigService } from '@nestjs/config'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import helmet from 'helmet'
import passport from 'passport'
import session from 'express-session'
import type { INestApplication } from '@nestjs/common'
// import { Default } from './config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Default } from './config/config.interface'

export function middleware(app: INestApplication): INestApplication {
  const isProduction = (process.env.NODE_ENV === 'production')
  const configService = app.get(ConfigService)
  const corsConfig = configService.get<Default['cors']>('cors')

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  }))

  app.use(require('compression')())
  app.use(session({
    // Requires 'store' setup for production
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction },
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  // app.use(helmet({ contentSecurityPolicy: isProduction ? undefined : false }))

  if (corsConfig.enabled) {
    // 仅适用于 REST 端点, 
    // 要在 GraphQL 中启用 CORS，请在导入GraphQL模块时将cors属性设置为true 或
    // 传递CORS 配置对象(https://github.com/expressjs/cors#configuration-options) 或
    // 回调函数作为cors属性值(https://github.com/expressjs/cors#configuring-cors-asynchronously)。
    // app.enableCors({
    //   origin: corsConfig.origin,
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   credentials: true, // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
    //   preflightContinue: true, // Pass the CORS preflight response to the next handler.
    //   optionsSuccessStatus: 204, // Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
    // }) 
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    })
  }

  const swaggerConfig = configService.get<Default['swagger']>('swagger')
  if (swaggerConfig.enabled) {
    const swaggerConfig = configService.get<Default['swagger']>('swagger')
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build()
    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
  }
  
  return app
}
