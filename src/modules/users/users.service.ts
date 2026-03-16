import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignupDto } from '../auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async create(createUserDto: SignupDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to create user',
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      return users.map((user) => ({
        ...user,
        password: '*'.repeat(5),
      }));
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch users',
      );
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch user by email',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      return user ? { ...user, password: '*'.repeat(5) } : null;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to fetch user by id',
      );
    }
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   try {
  //     const user = await this.findOne(id);
  //     if (!user) throw new NotFoundException('User not found');
  //     const updatedUser = await this.userRepository.update(id, updateUserDto);
  //     return updatedUser;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       error?.message || 'Failed to update user',
  //     );
  //   }
  // }

  async remove(id: number, userId: number) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('User not found');

      if (user.id !== userId)
        throw new ForbiddenException(
          'You are not authorized to delete this user',
        );
      await this.userRepository.delete(id);
      return user.id;
    } catch (error) {
      throw new InternalServerErrorException(
        error?.message || 'Failed to delete user',
      );
    }
  }
}
