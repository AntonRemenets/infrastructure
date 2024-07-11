import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserModel } from './models/user.model'
import { ValidationPipe } from './pipes/validation.pipe'

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerNewUser(@Body() dto: RegisterUserDto): Promise<UserModel> {
    return this.auth.newUser(dto)
  }

  getTokens() {}
  refreshTokens() {}
}
