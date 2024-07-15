import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator'

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf(o => o.accessToken === undefined)
  email: string

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.accessToken === undefined)
  password: string
}
export class AuthTokenDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.email === undefined && o.password === undefined)
  accessToken: string
}

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf(o => o.accessToken === undefined)
  email?: string

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.accessToken === undefined)
  password?: string

  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.email === undefined && o.password === undefined)
  accessToken?: string
}
