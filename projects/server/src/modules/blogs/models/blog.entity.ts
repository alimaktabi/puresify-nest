import { User } from 'modules/accounts/models'
import { Category } from 'modules/categories/models'
import { Media } from 'modules/uploads/models/media.entity'
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BlogType } from './enum.entity'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: Category

  @Column()
  title: string

  @Column({ length: 400 })
  description: string

  @Column('text')
  body: string

  @ManyToOne(() => Media, { onDelete: 'SET NULL' })
  media: Media

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date

  @Column({ nullable: true })
  mediaVideoId?: number

  @Column({ nullable: true })
  mediaAudioId?: number

  @Column({ default: 0 })
  viewsCount: number

  @Column({ default: true })
  show: boolean

  @Column({ default: 0 })
  priceAsMinutes: number

  @Column()
  type: BlogType
}
