import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'task', schema: 'management' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  taskId: string;

  @Column({ type: 'varchar', length: 255 })
  taskName: string;

  @Column({ type: 'text', nullable: true })
  taskDescription: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
