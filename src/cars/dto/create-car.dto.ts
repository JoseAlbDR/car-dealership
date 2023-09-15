import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;
}

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsOptional()
  readonly brand: string;

  @IsNotEmpty()
  @IsOptional()
  readonly model: string;
}
