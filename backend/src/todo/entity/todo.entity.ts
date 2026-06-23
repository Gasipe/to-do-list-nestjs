import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('toDos')
export class ToDo {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 250 })
  title!: string;

  @Column({ type: 'varchar', length: 600 })
  description!: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt!: Date;
}
