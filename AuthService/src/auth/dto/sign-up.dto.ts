import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class SignUpDto {
  constructor(partial: Partial<SignUpDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly firstName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly lastName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly age!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password!: string;
}
