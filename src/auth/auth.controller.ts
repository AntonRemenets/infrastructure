import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { ValidationPipe } from './pipes/validation.pipe'
import { TokenModel } from './models/token.model'

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerNewUser(@Body() dto: RegisterUserDto): Promise<TokenModel> {
    return this.auth.newUser(dto)
  }

  @Post('access_token')
  login(@Body() dto: RegisterUserDto): Promise<TokenModel> {
    return this.auth.login(dto)
  }

  refreshTokens() {}
}
