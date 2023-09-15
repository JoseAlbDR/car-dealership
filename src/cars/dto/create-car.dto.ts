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
  @IsOptional()
  @IsNotEmpty()
  readonly id?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly model?: string;
}
