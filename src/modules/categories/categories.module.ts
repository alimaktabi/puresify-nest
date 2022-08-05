import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Blog } from '../blogs/models'
import { CategoryController } from './controllers/category.controller'
import { Category } from './models'
import { CategoryService } from './services/category.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Blog])],
  providers: [CategoryService],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoriesModule {}
