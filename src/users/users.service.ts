import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity.js';
import { RoleName } from '../auth/enums/role.enum.js';
import * as bcrypt from 'bcrypt';

// Users service provides a way to retreive existing user in hardcoded list
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(email: string, password: string): Promise<User> {
    const userRole = await this.rolesRepository.findOne({
      where: { name: RoleName.User },
    });

    if (!userRole) {
      throw new Error('Default user role not found');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      roles: [userRole],
    });

    return this.usersRepository.save(user);
  }
}
