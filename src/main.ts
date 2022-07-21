import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
// import '@/graphql/enums'
// import { LoggerMiddleware, LoggingInterceptor, TimeoutInterceptor, ValidationPipe } from './common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { getConnection } from 'typeorm'
import { middleware } from './app.middleware'
import { configLog } from './config/log.config'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'
import { ValidationPipe } from './common/pipes/validation.pipe'
import Seed from "../seed"

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  let node_env = process.env.node_env
  const configService = app.get(ConfigService)
  const appPort = configService.get<string>('port')
  const domain = configService.get<string>('domain')
  const primary_color = configService.get<string>('primary_color')
  const end_point = configService.get<string>('end_point')

  configLog(app)

  const connection = getConnection("default")
  const { isConnected } = connection
  // await connection.synchronize()
  // connection.runMigrations()
  isConnected
    ? Logger.log(`🌨️  Database connected`, 'TypeORM', false)
    : Logger.error(`❌  Database connect error`, '', 'TypeORM', false)
  new Promise(()=>{
    // Seed()
  })

  // node_env !== 'testing' && app.use(LoggerMiddleware) // 在app.module中写了

  app.useGlobalInterceptors(new LoggingInterceptor(configService))
  app.useGlobalInterceptors(new TimeoutInterceptor())
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe())

  // Express Middleware
  middleware(app)


  app.enableShutdownHooks()

  await app.listen(appPort || 3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  node_env !== 'production'
    ? (Logger.log(
      `🤬  Application is running on: ${await app.getUrl()}`,
      'NestJS',
      false
    ),
      Logger.log(
        `🚀  Server ready at http://${domain}:${appPort.toString()
        // chalk.hex(primary_color).bold(appPort.toString())
        }/${end_point}`,
        'Bootstrap',
        false
      ),
      Logger.log(
        `🚀  Subscriptions ready at ws://${domain}:${appPort.toString()
        // chalk.hex(primary_color).bold(appPort.toString())
        }/${end_point}`,
        'Bootstrap',
        false
      ))
    : Logger.log(
      `🚀  Server is listening on port ${appPort.toString()
      // chalk.hex(primary_color).bold(appPort.toString())
      }`,
      'Bootstrap',
      false
    )
}


bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false)
  throw e
})