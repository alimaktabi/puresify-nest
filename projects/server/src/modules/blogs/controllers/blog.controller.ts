import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Auth } from 'modules/accounts/decorators'
import { Roles } from 'modules/accounts/decorators/roles.decorator'
import { JwtGuard } from 'modules/accounts/guards'
import { User } from 'modules/accounts/models'
import { UserType } from 'modules/accounts/models/enum.entity'
import { Category } from 'modules/categories/models'
import { Media } from 'modules/uploads/models/media.entity'
import { LessThan, MoreThan, Repository } from 'typeorm'
import { BlogDto } from '../dto/blog.dto'
import { BlogService } from '../services/blog.service'

@Controller('blogs')
export class BlogController {
  constructor(
    private blogService: BlogService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Media)
    private mediaRepo: Repository<Media>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  @Get('my-blogs')
  @UseGuards(JwtGuard)
  async getMyBlogs(@Auth('id') userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: {
        library: true,
      },
    })

    return user.library
      .filter((item) => item.publishAt < new Date())
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        priceAsMinutes: item.priceAsMinutes,
        publishAt: item.publishAt,
        viewsCount: item.viewsCount,
        media: item.media,
      }))
  }

  @Get()
  async getBlogs(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('name') title?: string,
    @Query('categoryId') categoryId?: number,
  ) {
    return this.blogService.getBlogs(
      page,
      perPage,
      title,
      categoryId,
    )
  }

  @Get(':id/preview')
  async getBlogPreview(@Param('id') id: number) {
    return this.blogService.blogRepo.findOne({
      where: {
        id,
        publishAt: LessThan(new Date()),
        show: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
        user: {
          firstName: true,
          lastName: true,
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
        user: true,
        media: true,
      },
    })
  }

  @Post(':id/purchase')
  @UseGuards(JwtGuard)
  async purchaseBlog(
    @Param('id') id: number,
    @Auth('id') userId: number,
  ) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        library: {
          media: true,
        },
      },
    })

    const blog = await this.blogService.blogRepo.findOneBy({
      id,
    })

    if (user.library.find((item) => item.id === blog.id))
      throw new BadRequestException(
        'you already purchased this blog',
      )

    user.library.push(blog)

    if (user.minutes < blog.priceAsMinutes)
      throw new BadRequestException(
        "you don't have the minutes to buy this blog",
      )

    user.minutes -= blog.priceAsMinutes

    await this.userRepo.save(user)

    return 'blog purchased'
  }

  @Post('create')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Auth('id') userId: number,
    @Body() data: BlogDto,
  ) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
      },
    })

    return this.blogService.blogRepo.save({
      ...data,
      user,
      category: await this.categoryRepo.findOneByOrFail({
        id: data.categoryId,
      }),
      media: await this.mediaRepo.findOneBy({
        id: data.mediaId,
      }),
    })
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  @HttpCode(HttpStatus.OK)
  async deleteBlog(
    @Auth('id') userId: number,
    @Param('id') id: number,
  ) {
    const blog = await this.blogService.blogRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    })

    if (!blog) throw new NotFoundException('blog not found')

    if (blog.user.id !== userId)
      throw new ForbiddenException(
        "You don't have permission to edit this blog",
      )

    await this.blogService.blogRepo.delete(id)

    return 'blog deleted'
  }

  @Put(':id/update')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  @HttpCode(HttpStatus.OK)
  async updateBlog(
    @Auth('id') userId: number,
    @Param('id') id: number,
    @Body() data: BlogDto,
  ) {
    const blog = await this.blogService.blogRepo.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    })

    if (blog?.user?.id !== userId)
      throw new ForbiddenException(
        "You don't have permission to edit this blog",
      )

    const user = await this.userRepo.findOneBy({
      id: userId,
    })

    return this.blogService.blogRepo.save({
      id,
      ...data,
      user,
      category: await this.categoryRepo.findOneByOrFail({
        id: data.categoryId,
      }),
      media: await this.mediaRepo.findOneBy({
        id: data.mediaId,
      }),
    })
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async getBlog(
    @Param('id') id: number,
    @Auth('id') userId: number,
  ) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
      relations: {
        library: true,
      },
    })

    const blog = await this.blogService.blogRepo.findOneBy({
      id,
      publishAt: LessThan(new Date()),
      show: true,
    })

    if (!blog) throw new NotFoundException('blog not found')

    if (!user.library.find((item) => item.id === blog.id))
      throw new ForbiddenException(
        "You don't have this blog in your library",
      )

    await this.blogService.blogRepo.update(blog.id, {
      ...blog,
      viewsCount: blog.viewsCount + 1,
    })

    return blog
  }
}
