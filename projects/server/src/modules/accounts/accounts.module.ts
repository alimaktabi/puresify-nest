import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Blog } from '../blogs/models'
import { AuthController } from './controllers/auth.controller'
import { RolesGuard } from './guards/roles.guard'
import { User } from './models'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategy'

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Blog]),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard],
  controllers: [AuthController],
})
export class AccountsModule {}
