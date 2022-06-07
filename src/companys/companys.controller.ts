import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanysService } from './companys.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Company } from './entities/company.entity';

// @ApiBearerAuth()
@Controller('companys')
export class CompanysController {
  constructor(private readonly companysService: CompanysService) {}

  @Get()
  findAll() {
    return this.companysService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Company,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() CreateCompanyDto: CreateCompanyDto) {
    return this.companysService.create(CreateCompanyDto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateCompanyDto: UpdateCompanyDto) {
    console.log('aki')
    return this.companysService.update(id, UpdateCompanyDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companysService.remove(id);
  }
}
