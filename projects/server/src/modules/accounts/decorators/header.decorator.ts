import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type headerSetter = (header: string, value: string) => void;

export const SetHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): headerSetter => {
    const res = ctx.switchToHttp().getResponse();

    return (header, value) => res.header(header, value);
  },
);
