import { User } from 'modules/accounts/models'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Blog } from './blog.entity'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @Column({ length: 300 })
  body: string

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User

  @ManyToOne(() => Blog)
  blog: Blog

  @Column({ default: false })
  show: boolean
}
