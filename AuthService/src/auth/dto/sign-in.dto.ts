import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class SignInDto {
  constructor(partial: Partial<SignInDto>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password!: string;
}
