import { ICar, ICheckCar } from '../interfaces/car.interface';
import { ConflictException } from '@nestjs/common';

export const checkCarEsixts = (cars: ICar[], checkCar: ICheckCar) => {
  const alreadyExist = cars.some(
    (car) => car.brand === checkCar.brand && checkCar.model === checkCar.model,
  );

  console.log(alreadyExist);

  if (alreadyExist)
    throw new ConflictException(
      `Car with brand: ${checkCar.brand} and model: ${checkCar.model} already exists`,
    );
};
