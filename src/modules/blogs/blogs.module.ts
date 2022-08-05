import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccountsModule } from '../accounts/accounts.module'
import { User } from '../accounts/models'
import { Category } from '../categories/models'
import { Media } from '../uploads/models/media.entity'
import { BlogController } from './controllers/blog.controller'
import { Blog } from './models'
import { BlogService } from './services/blog.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Blog, User, Media]),
    AccountsModule,
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogsModule {}
