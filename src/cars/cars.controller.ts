import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    console.log(createCarDto);
    return this.carsService.create(createCarDto);
  }

  @Delete(':id')
  deleteCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.carsService.deleteById(id);
  }

  @Patch(':id')
  updateCarById(
    @Body() updateCarDto: UpdateCarDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.carsService.updateById(id, updateCarDto);
  }
}
