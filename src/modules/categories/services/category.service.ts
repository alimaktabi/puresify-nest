import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../models/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    public categoryRepo: Repository<Category>,
  ) {}
}
