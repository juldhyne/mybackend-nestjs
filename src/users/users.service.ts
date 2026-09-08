import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Users service provides a way to retreive existing user in hardcoded list
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
