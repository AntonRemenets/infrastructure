import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { ValidationPipe } from './pipes/validation.pipe'
import { TokensModel } from './models/token.model'
import { AuthLoginDto } from './dto/auth.dto'
import { Response } from 'express'

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  registerNewUser(@Body() dto: RegisterUserDto): Promise<TokensModel> {
    try {
      return this.auth.newUser(dto)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  @Post('login')
  async login(@Body() dto: AuthLoginDto, @Res() res: Response) {
    const tokens: TokensModel | void = await this.auth.loginWithCredentials(dto)
    this.setTokensToCookies(tokens, res)
  }

  refreshTokens() {}

  private setTokensToCookies(tokens: TokensModel, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException()
    }
    res.cookie('refreshtoken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.exp),
      path: '/',
    })
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken })
  }
}
