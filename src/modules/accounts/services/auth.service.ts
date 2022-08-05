import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../models'
import { RegisterDto } from '../dbo'
import { UserType } from '../models/enum.entity'

import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    public userRepo: Repository<User>,
  ) {}

  async login(phoneNumber: string, password: string) {
    const user = await this.userRepo.findOne({
      where: {
        phoneNumber,
      },
    })

    if (
      !user ||
      !(await argon.verify(user.password, password))
    )
      throw new ForbiddenException(
        'incorrect username or password',
      )

    return this.removePassword(user)
  }

  async register(user: RegisterDto) {
    return this.removePassword(
      await this.userRepo.save({
        ...user,
        roles: [UserType.user],
        password: await argon.hash(user.password),
      }),
    )
  }

  private removePassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user

    return rest
  }
}
