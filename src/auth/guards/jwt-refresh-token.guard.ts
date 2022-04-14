import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
    public getRequest(context: ExecutionContext): Request {
        if (context.getType<GqlContextType>() === 'graphql') {
            const ctx = GqlExecutionContext.create(context).getContext()
            return <Request>ctx.req
        }

        return context.switchToHttp().getRequest<Request>()
    }
}