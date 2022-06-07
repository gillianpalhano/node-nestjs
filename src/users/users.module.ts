import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
// import { DateScalar } from 'src/common/scalars/date.scalar';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
    UserResolver,
    // DateScalar
  ]
})
export class UsersModule {}
