import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class AdminUser extends Base {
  @Column()
  adminuser: string;

  @Column({
    select: false,
  })
  adminpass: string;

  @Column()
  admingrade: number;

  @Column()
  nickname: string;
}
