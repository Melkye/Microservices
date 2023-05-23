import {
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  constructor(partial: Partial<UpdateUserDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly firstName!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly lastName!: string;

  @ApiProperty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsNumber()
  readonly age!: number;
}
