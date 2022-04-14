
import {
  Catch,
  ArgumentsHost, // 获取客户端参数
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'
import { Logger } from 'winston'

@Catch(HttpException)
export class GraphQLExceptionFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: Logger) {
    super()
    this.logger = logger
  }

  public override catch(exception: HttpException, host: ArgumentsHost): any {
    const res = exception.getResponse() as any
    if (exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `
  httpName: ${exception.name},
  httpStatus: ${exception.getStatus()},
  httpMessage: ${exception.message},
  bizCode: ${res['code']},
  bizMessage: ${res['msg']},
  bizError: ${res['error']},
  stack: ${exception.stack}
  `,
      )
    } else {
      this.logger.error(
        `
  httpName: ${exception.name},
  httpStatus: ${exception.getStatus()},
  httpMessage: ${exception.message},
  bizCode: ${res['statusCode']},
  bizMessage: ${res['message']},
  stack: ${exception.stack}
  `,
      )
    }

    GqlArgumentsHost.create(host)
    return exception
  }
}
