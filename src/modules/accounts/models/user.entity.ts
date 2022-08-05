import { Blog } from 'src/modules/blogs/models'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { UserType } from './enum.entity'

@Entity()
@Unique(['phoneNumber'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName?: string

  @Column()
  lastName?: string

  @Column({ length: 11 })
  phoneNumber: string

  @Column()
  password: string

  @Column({ default: 30 })
  minutes: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToMany(() => Blog)
  @JoinTable()
  library: Blog[]

  @Column('int', { array: true, default: [UserType.user] })
  roles: UserType[]
}
