import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from '../dbo'
import { LoginDto } from '../dbo/login.dto'
import {
  Auth,
  headerSetter,
  SetHeader,
} from '../decorators'
import { JwtGuard } from '../guards'
import { User } from '../models'
import { UserType } from '../models/enum.entity'
import { AuthService } from '../services/auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private signToken(
    userId: number,
    phoneNumber: string,
    roles: UserType[],
    firstName: string,
    lastName: string,
    minutes: number,
  ): Promise<string> {
    return this.jwt.signAsync(
      {
        sub: userId,
        userId,
        phoneNumber,
        roles,
        firstName,
        lastName,
        minutes,
      },
      {
        expiresIn: '30d',
        secret: this.config.get('JWT_SECRET'),
      },
    )
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getMe(@Auth() user: User) {
    return user
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(
    @Body()
    data: LoginDto,
    @SetHeader()
    setHeader: headerSetter,
  ) {
    const user = await this.authService.login(
      data.phoneNumber,
      data.password,
    )

    setHeader(
      'Authorization',
      'Bearer ' +
        (await this.signToken(
          user.id,
          user.phoneNumber,
          user.roles,
          user.firstName,
          user.lastName,
          user.minutes,
        )),
    )

    return user
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body()
    data: RegisterDto,
    @SetHeader()
    setHeader: headerSetter,
  ): Promise<Partial<User>> {
    const existingUserWithPhoneNumber =
      await this.authService.userRepo.findOne({
        where: {
          phoneNumber: data.phoneNumber,
        },
      })

    if (existingUserWithPhoneNumber)
      throw new BadRequestException(
        'this phoneNumber already exists',
      )

    const user = await this.authService.register(data)

    setHeader(
      'Authorization',
      'Bearer ' +
        (await this.signToken(
          user.id,
          user.phoneNumber,
          user.roles,
          user.firstName,
          user.lastName,
          user.minutes,
        )),
    )

    return user
  }
}
