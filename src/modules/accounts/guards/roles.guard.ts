import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserType } from '../models/enum.entity'
import { JwtGuard } from './jwt.guard'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<
      UserType[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRoles) return true

    const { user } = context.switchToHttp().getRequest()

    return requiredRoles.some((role) =>
      user?.roles?.includes(role),
    )
  }
}
