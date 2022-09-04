import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common'

export const Auth =
  createParamDecorator(
    (
      data: unknown,
      ctx: ExecutionContext,
    ) => {
      const user =
        ctx
          .switchToHttp()
          .getRequest().user

      if (
        typeof data ===
        'string'
      ) {
        return user[
          data
        ]
      }

      return user
    },
  )
