import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Credentials')
export default class Credentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userId: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(data?: Omit<Credentials, 'id' | 'createdAt' | 'updatedAt'>) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.userId = data.userId;
    }
  }
}
