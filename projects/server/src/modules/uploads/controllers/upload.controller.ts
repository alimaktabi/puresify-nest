import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { existsSync, rmSync } from 'fs'
import { join } from 'path'
import { Roles } from 'modules/accounts/decorators/roles.decorator'
import { JwtGuard } from 'modules/accounts/guards'
import { UserType } from 'modules/accounts/models/enum.entity'
import { myStorage } from 'utils/disk-storage'
import { MediaService } from '../services/media.service'

@Controller('upload')
export class UploadController {
  constructor(private mediaService: MediaService) {}

  @Post()
  @Roles(UserType.admin)
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './public/uploads',
      storage: myStorage,
    }),
  )
  async createMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('alt') alt: string,
  ) {
    return this.mediaService.create({
      alt,
      path: file.path,
    })
  }

  @Get(':id')
  async getMedia(@Param('id') id: number) {
    return this.mediaService.mediaRepo.findOneBy({
      id,
    })
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  async deleteMedia(@Param('id') id: number) {
    const media =
      await this.mediaService.mediaRepo.findOneBy({
        id,
      })

    if (!media)
      throw new NotFoundException('media not found')

    if (existsSync(media.path)) {
      rmSync(media.path)
    }

    await this.mediaService.mediaRepo.delete(id)

    return 'media deleted'
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  @Roles(UserType.admin)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './public/uploads',
      storage: myStorage,
    }),
  )
  async updateMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body('alt') alt: string,
    @Param('id') id: number,
  ) {
    const media =
      await this.mediaService.mediaRepo.findOneBy({
        id,
      })

    if (!media)
      throw new NotFoundException('media not found')

    if (existsSync(media.path)) {
      rmSync(media.path)
    }

    media.alt = alt

    this.mediaService.mediaRepo.update(id, media)

    return media
  }
}
