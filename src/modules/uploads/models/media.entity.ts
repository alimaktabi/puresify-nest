import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  alt: string

  @Column()
  path: string

  @CreateDateColumn()
  createdAt: Date
}
