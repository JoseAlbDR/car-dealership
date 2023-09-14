import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './cars.controller';

@Injectable()
export class CarsService {
  private cars: ICar[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(car: ICar) {
    this.cars.push(car);
  }

  deleteById(id: number) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    this.cars = this.cars.filter((car) => car.id !== id);
  }

  updateById(id: number, updatedCar: ICar) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car = { id, ...updatedCar };
      }
      return car;
    });
  }
}
