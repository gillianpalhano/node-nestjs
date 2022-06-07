import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { sanitizeObject } from 'src/helpers/util';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  findAll(query?: any ): Promise<User[]> {
    query = sanitizeObject(query)
    return this.userRepository.find({ ...query });
  }

  findOne(id: number): Promise<User> {
    const user = this.userRepository.findOne({ id });
    if (!user) throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userCreated = await this.userRepository.save(createUserDto);
    return await this.userRepository.findOne({ id: userCreated.id });;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      let user = await this.userRepository.findOne({ id });
      if (!user) throw new NotFoundException(id) // HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);

      await this.userRepository.update({ id }, updateUserDto)
      user = await this.userRepository.findOne({ id });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      let deletedUser = await this.userRepository.findOne({ id }) // users.findIndex((user: User) => user.id === id);
      if (!deletedUser) throw new HttpException(`User ID ${id} not found`, HttpStatus.NOT_FOUND);
      
      deletedUser.deleted_by = 1;
      
      await this.userRepository.save(deletedUser);
      await this.userRepository.softDelete(deletedUser);

      return true;
       
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
