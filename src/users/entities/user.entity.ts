import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { Role } from './role.entity.js';
import { BaseEntity } from '../../common/base.entity.js';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
  })
  roles: Role[];
}
