import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common'
import type { Request } from 'express';

@Injectable()
class HttpCacheInterceptor extends CacheInterceptor {
	override trackBy(context: ExecutionContext): string | undefined {
		const request = context.switchToHttp().getRequest()
		const httpServer = request.applicationRef

		const isGetRequest = httpServer.getRequestMethod(request) === 'GET'
		const excludePaths = []
		if (
			!isGetRequest ||
			(isGetRequest && excludePaths.includes(httpServer.getRequestUrl))
		) {
			return undefined
		}
		return httpServer.getRequestUrl(request)
	}
}
