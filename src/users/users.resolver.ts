import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(() => [User])
  users(
    @Args({name: 'name', nullable: true}) name?: string,
    @Args({name: 'name_usual', nullable: true}) name_usual?: string
  ): Promise<User[]> {
    return this.usersService.findAll({name, name_usual});
  }

  @Mutation(() => User)
  async createUser(
    @Args('data') data: CreateUserDto
  ): Promise<User> {
    return await this.usersService.create(data);
}

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    return await this.usersService.remove(id);
  }

}