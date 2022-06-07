import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { companyProviders } from './companys.providers';
import { CompanysController } from './companys.controller';
import { CompanysService } from './companys.service';
import { CompanyResolver } from './companys.resolver';
@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [CompanysController],
  providers: [
    ...companyProviders,
    CompanysService,
    CompanyResolver,
  ]
})
export class CompanysModule {}
