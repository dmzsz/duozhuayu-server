import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
	RequestTimeoutException
} from '@nestjs/common'
import { Observable, throwError, TimeoutError } from 'rxjs'
import { catchError, timeout } from 'rxjs/operators'

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			timeout(30000), // 30s之后请求处理将被取消
			catchError(err => {
				if (err instanceof TimeoutError) {
					return throwError(() => new RequestTimeoutException())
				}
				return throwError(() => err)
			}))
	}
}
