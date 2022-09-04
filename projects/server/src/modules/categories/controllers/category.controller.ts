import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Roles } from 'modules/accounts/decorators/roles.decorator'
import { JwtGuard } from 'modules/accounts/guards'
import { UserType } from 'modules/accounts/models/enum.entity'
import { Blog } from 'modules/blogs/models'
import {
  LessThan,
  LessThanOrEqual,
  Repository,
} from 'typeorm'
import { Category } from '../models'
import { CategoryService } from '../services/category.service'

@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(Blog)
    private blogRepo: Repository<Blog>,
  ) {}

  @Get()
  async getCategories() {
    return this.categoryService.categoryRepo.find({})
  }

  @Post()
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  async createCategory(
    @Body('slug') slug: string,
    @Body('name') name: string,
  ) {
    return this.categoryService.categoryRepo.save({
      name,
      slug,
    })
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  async updateCategory(
    @Body('slug') slug: string,
    @Body('name') name: string,
    @Param('id') id: number,
  ) {
    return this.categoryService.categoryRepo.save({
      id,
      name,
      slug,
    })
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  deleteCategory(@Param('id') categoryId: number) {
    return this.categoryService.categoryRepo.delete(
      categoryId,
    )
  }

  @Get(':slug')
  async getCategory(@Param('slug') slug: string) {
    const category =
      await this.categoryService.categoryRepo.findOne({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      })

    if (!category)
      throw new NotFoundException('Category not found')

    const blogs = await this.blogRepo.find({
      where: {
        category: {
          id: category.id,
        },
        publishAt: LessThanOrEqual(new Date()),
        show: true,
      },
      relations: {
        media: true,
      },
      select: {
        id: true,
        title: true,
        category: {
          name: true,
          id: true,
        },
        description: true,
        publishAt: true,
        media: {
          path: true,
          alt: true,
        },
        priceAsMinutes: true,
        type: true,
        user: {
          firstName: true,
          lastName: true,
          id: true,
        },
      },
    })

    return {
      ...category,
      blogs,
    }
  }
}
