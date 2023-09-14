import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ICar } from './interfaces/car.interface';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.findOneById(id);
  }

  @Post()
  create(@Body() car: ICar) {
    console.log(car);
    return this.carsService.create(car);
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteById(id);
  }

  @Patch(':id')
  updateCarById(@Body() car: ICar, @Param('id', ParseIntPipe) id: number) {
    return this.carsService.updateById(id, car);
  }
}
