import { Blog } from 'src/modules/blogs/models'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

@Entity()
@Unique(['slug'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  slug: string

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[]
}
