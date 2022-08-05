import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadController } from './controllers/upload.controller'
import { Media } from './models/media.entity'
import { MediaService } from './services/media.service'

@Module({
  controllers: [UploadController],
  providers: [MediaService],
  imports: [TypeOrmModule.forFeature([Media])],
})
export class UploadsModule {}
