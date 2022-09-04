import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'
import { BlogType } from '../models/enum.entity'

export class BlogDto {
  @IsNotEmpty()
  @IsEnum(BlogType)
  type: BlogType

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  body: string

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  publishAt: Date

  @IsNumber()
  @IsOptional()
  mediaVideoId?: number

  @IsNumber()
  @IsOptional()
  mediaAudioId?: number

  @IsNotEmpty()
  @IsOptional()
  categoryId?: number

  @IsNotEmpty()
  @IsNumber()
  mediaId: number

  @IsBoolean()
  @IsNotEmpty()
  show: boolean

  @IsNumber()
  @IsNotEmpty()
  priceAsMinutes: number
}
