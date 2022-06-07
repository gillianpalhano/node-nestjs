import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { sanitizeObject } from 'src/helpers/util';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanysService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<Company>,
  ) {}

  findAll(query?: any ): Promise<Company[]> {
    query = sanitizeObject(query)
    return this.companyRepository.find({ ...query });
  }

  findOne(id: number): Promise<Company> {
    const company = this.companyRepository.findOne({ id });
    if (!company) throw new HttpException(`Company ID ${id} not found`, HttpStatus.NOT_FOUND);
    return company;
  }

  async create(CreateCompanyDto: CreateCompanyDto): Promise<Company> {
    const companyCreated = await this.companyRepository.save(CreateCompanyDto);
    return await this.companyRepository.findOne({ id: companyCreated.id });;
  }

  async update(id: number, UpdateCompanyDto: UpdateCompanyDto): Promise<Company> {
    try {
      let company = await this.companyRepository.findOne({ id });
      if (!company) throw new NotFoundException(id)

      await this.companyRepository.update({ id }, UpdateCompanyDto)
      company = await this.companyRepository.findOne({ id });
      return company;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      let deletedCompany = await this.companyRepository.findOne({ id })
      if (!deletedCompany) throw new HttpException(`Company ID ${id} not found`, HttpStatus.NOT_FOUND);
      
      deletedCompany.deleted_by = 1;
      
      await this.companyRepository.save(deletedCompany);
      await this.companyRepository.softDelete(deletedCompany);

      return true;
       
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
