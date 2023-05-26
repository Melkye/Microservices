import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';

export default class UpdateUserDto {
  constructor(partial: Partial<UpdateUserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly firstName!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly lastName!: string;

  @IsEmail()
  readonly email!: string;

  @IsNumber()
  readonly age!: number;
}
