import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { CompanysService } from './companys.service';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companysService: CompanysService) {}

  @Query(() => Company)
  async company(@Args('id') id: number): Promise<Company> {
    const company = await this.companysService.findOne(id);
    if (!company) {
      throw new NotFoundException(id);
    }
    return company;
  }

  @Query(() => [Company])
  companys(
    @Args({name: 'name', nullable: true}) name?: string,
  ): Promise<Company[]> {
    return this.companysService.findAll({name});
  }

  @Mutation(() => Company)
  async createCompany(
    @Args('data') data: CreateCompanyDto
  ): Promise<Company> {
    return await this.companysService.create(data);
  }

  @Mutation(() => Company)
  async updateCompany(
    @Args('id') id: number,
    @Args('data') data: UpdateCompanyDto
  ): Promise<Company> {
    return await this.companysService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCompany(@Args('id') id: number): Promise<boolean> {
    return await this.companysService.remove(id);
  }

}