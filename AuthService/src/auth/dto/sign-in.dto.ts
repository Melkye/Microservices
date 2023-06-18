import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class SignInDto {
  constructor(partial: Partial<SignInDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password!: string;
}
