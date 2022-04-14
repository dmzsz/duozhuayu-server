// import { Logger } from '@/common';
import { Logger } from '@/common/providers/logger.service';
import { GraphQLExceptionFilter } from '@/common/filters/graphql-exception.filter'
import { INestApplication } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

export const configLog = async (app: INestApplication) => {
  // const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER)
  // app.useLogger(nestWinston)
  // app.useGlobalFilters(new GraphQLExceptionFilter(nestWinston.logger))

  app.useLogger(await app.resolve(Logger));
}