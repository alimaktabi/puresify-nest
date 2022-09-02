import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  FindManyOptions,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm'
import { Category } from 'src/modules/categories/models/category.entity'
import { Blog } from '../models'

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    public blogRepo: Repository<Blog>,
    @InjectRepository(Category)
    public categoryRepo: Repository<Category>,
  ) {}

  async getBlogs(
    page: number,
    perPage: number,
    title?: string,
    categoryId?: number,
  ) {
    const query: any = {
      take: perPage,
      skip: (page - 1) * perPage,
      where: {
        publishAt: LessThan(new Date()),
        show: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        media: {
          alt: true,
          id: true,
          path: true,
        },
        type: true,
        viewsCount: true,
        title: true,
        publishAt: true,
        description: true,
        priceAsMinutes: true,
        id: true,
      },
      relations: {
        user: false,
        media: true,
      },
    }

    if (title) {
      query.where.title = Like('%' + title + '%')
    }

    if (categoryId) {
      query.where.category =
        await this.categoryRepo.findOneBy({
          id: categoryId,
        })
    }

    const [blogs, total] = await this.blogRepo.findAndCount(
      query,
    )

    return {
      blogs,
      total,
    }
  }
}
