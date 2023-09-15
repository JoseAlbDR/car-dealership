import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { checkCarEsixts } from './utils/cars.checkCarExists';
@Injectable()
export class CarsService {
  private cars: ICar[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    checkCarEsixts(this.cars, createCarDto);

    this.cars = [...this.cars, { id: uuid(), ...createCarDto }];
    return this.cars.at(-1);
  }

  deleteById(id: string) {
    this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return { message: `Car with id ${id} successfully deleted` };
  }

  updateById(id: string, updateCarDto: UpdateCarDto) {
    this.findOneById(id);

    checkCarEsixts(this.cars, updateCarDto);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car = { ...car, ...updateCarDto, id };
      }
      return car;
    });

    const updatedCar = this.cars.find(
      (car) => car.id === updateCarDto?.id || id,
    );

    return updatedCar;
  }
}
