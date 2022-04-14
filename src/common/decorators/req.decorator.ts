import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'

export const ReqDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context)
      return ctx.getContext().req;
    } else {
      return context.switchToHttp().getRequest();
    }
  }
)
