import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	Logger
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import * as chalk from 'chalk'
import { ConfigService } from '@nestjs/config'
import { Default } from '@/config/config.interface'

// 打印graphql的请求
@Injectable()
export class LoggingInterceptor implements NestInterceptor {

	constructor(private readonly configService: ConfigService) { }

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const primary_color = this.configService.get<string>('primary_color')
		if (context.getArgs()[3]) {
			const parentType = context.getArgs()[3]['parentType']
			const fieldName = `${context.getArgs()[3]['fieldName']}`
			// chalk
			// 	.hex(primary_color)
			// 	.bold(`${context.getArgs()[3]['fieldName']}`)
			return next.handle().pipe(
				tap(() => {
					Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL')
				})
			)
		} else {
			const parentType = `${context.getArgs()[0].route.path}`
			//  chalk
			// 	.hex(primary_color)
			// 	.bold(`${context.getArgs()[0].route.path}`)
			const fieldName = `${context.getArgs()[0].route.stack[0].method}`
			// chalk
			// 	.hex(primary_color)
			// 	.bold(`${context.getArgs()[0].route.stack[0].method}`)
			return next.handle().pipe(
				tap(() => {
					Logger.debug(`⛩  ${parentType} » ${fieldName}`, 'GraphQL')
				})
			)
		}
	}
}
