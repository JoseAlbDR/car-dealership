import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  readonly brand: string;

  @IsNotEmpty()
  readonly model: string;
}
