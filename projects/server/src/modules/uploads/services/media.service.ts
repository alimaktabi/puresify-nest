import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Media } from '../models/media.entity'

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    public mediaRepo: Repository<Media>,
  ) {}

  create(media: Omit<Media, 'id' | 'createdAt'>) {
    return this.mediaRepo.save({
      alt: media.alt,
      path: media.path.replace(/(\\|\\\\)/g, '/'),
    })
  }
}
