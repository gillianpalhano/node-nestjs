import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
    UserResolver,
  ]
})
export class UsersModule {}
