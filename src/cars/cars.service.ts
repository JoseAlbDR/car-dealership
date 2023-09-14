import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
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

  create(car: CreateCarDto) {
    const newCar = { id: uuid(), ...car };
    this.cars.push(newCar);
  }

  deleteById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    this.cars = this.cars.filter((car) => car.id !== id);
  }

  updateById(id: string, updatedCar: ICar) {
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
