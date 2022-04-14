import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CacheModule, Logger, MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
// import { configuration } from '@/config'
import { HttpModule } from '@nestjs/axios'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GraphqlModule } from './graphql/graphql.module'
import { WinstonLogModule } from './common/modules/log.module'
// import { CommonModule, LoggerMiddleware, TimeoutInterceptor, TransformInterceptor, ValidationPipe } from './common'
import { CacheService } from './config/cache'
import { AuthModule } from './auth/auth.module'
// import { CommonModule } from './common'
import { ExceptionsFilter } from './common/filters/exceptions.filter'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { CommonModule } from './common/common.module'
import { configuration } from './config/configuration'
import * as entities from '@/entities'
// import { AuthModule } from './auth'
// import { ExceptionsFilter } from './common/filters'

@Module({
  imports: [
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('db'))
        return {
          ...configService.get('db'),
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      ...Object.values(entities)
    ]),
    // Static Folder
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),
    CommonModule,
    AuthModule,
    TerminusModule,
    HttpModule,
    GraphqlModule,
    // WinstonLogModule,
    CacheModule.registerAsync({
      useClass: CacheService
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   // https://docs.nestjs.com/pipes#global-scoped-pipes
    //   // 使用 app.useGlobalPipes() 无法注入依赖关系，因为绑定已经在任何模块的上下文之外完成
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeoutInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlAuthGuard,
    // },
    Logger,
    { provide: APP_FILTER, useClass: ExceptionsFilter },
  ],
})
export class AppModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
