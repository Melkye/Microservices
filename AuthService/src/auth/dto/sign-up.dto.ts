import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class SignUpDto {
  constructor(partial: Partial<SignUpDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  readonly lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password!: string;
}
