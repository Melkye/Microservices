import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class SignInDto {
  constructor(partial: Partial<SignInDto>) {
    Object.assign(this, partial);
  }

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
