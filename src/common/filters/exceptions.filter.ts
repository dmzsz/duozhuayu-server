import { ArgumentsHost, Catch, HttpAdapterHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql'
import { Request, Response } from 'express'

@Catch(HttpException)
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger()

  public override catch(exception: HttpException, host: ArgumentsHost): any {
    let args: unknown
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host)
      const { req: { body: { operationName, variables } } } = gqlHost.getContext()
      args = `${operationName} ${JSON.stringify(variables)}`
    } else {
      super.catch(exception, host)
    }

    const status = this.getHttpStatus(exception)
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error(`${exception.message}: ${args}`, exception.stack)
      } else {
        // Error Notifications
        this.logger.error('UnhandledException', exception)
      }
    }

    if (host.getType<GqlContextType>() === 'graphql') {
      return exception
    } else {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = this.getHttpStatus(exception)

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url
      })
    }
  }

  private getHttpStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
  }
}
