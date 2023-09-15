import { Injectable, NotFoundException } from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/create-car.dto';
import { checkCar } from './utils/cars.checkCar';
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
    checkCar(this.cars, createCarDto);

    this.cars = [...this.cars, { id: uuid(), ...createCarDto }];
    return this.cars.at(-1);
  }

  deleteById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    this.cars = this.cars.filter((car) => car.id !== id);

    return { message: `Car with id ${id} successfully deleted` };
  }

  updateById(id: string, updateCarDto: UpdateCarDto) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    checkCar(this.cars, updateCarDto);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car = { ...car, id: updateCarDto?.id || car.id, ...updateCarDto };
      }
      return car;
    });

    const updatedCar = this.cars.find(
      (car) => car.id === updateCarDto?.id || id,
    );

    return updatedCar;
  }
}
