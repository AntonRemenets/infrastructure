import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerNewUser() {
    return this.auth.newUser()
  }

  getTokens() {}
  refreshTokens() {}
}
