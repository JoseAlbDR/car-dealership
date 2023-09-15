import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICar } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/create-car.dto';
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
    const alreadyExist = this.cars.some(
      (car) =>
        car.brand === createCarDto.brand && car.model === createCarDto.model,
    );

    if (alreadyExist)
      throw new ConflictException(
        `Car with brand: ${createCarDto.brand} and model: ${createCarDto.model} already exists`,
      );

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

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car = { id, ...updateCarDto };
      }
      return car;
    });
  }
}
