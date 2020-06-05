/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Query, HttpCode, Redirect, Param, Body, HttpException, HttpStatus, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces/dog.interface';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  /*
  ValidationPipe
  ParseIntPipe
  ParseBoolPipe
  ParseArrayPipe
  ParseUUIDPipe
  DefaultValuePipe
  */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe를 사용할 경우, 매개변수가 number 형식이 아니라면
    // {"statusCode":400,"message":"Validation failed (numeric string is expected)","error":"Bad Request"} 의 오류를 발생
    return this.dogsService.findOne(id);
  }

  /*
  @Get(':id')
  findOne(@Param('id') id): string {
    throw new HttpException('Custom message', HttpStatus.FORBIDDEN);
  }

  @Get(':id/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5/'
      }
    }
  }
  */
}