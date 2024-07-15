import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { ValidationPipe } from './pipes/validation.pipe'
import { TokensModel } from './models/token.model'
import { AuthLoginDto } from './dto/auth.dto'
import { Request, Response } from 'express'

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

  @Get('refresh-tokens')
  async refreshTokens(
    @Req() req: Request,
    //@Cookie('refreshtoken') refreshToken: string,
    @Res() res: Response,
  ) {
    const refreshToken = req.cookies['refreshtoken']
    if (!refreshToken) {
      throw new UnauthorizedException()
    }
    const tokens: TokensModel = await this.auth.refreshTokens(refreshToken)
    this.setTokensToCookies(tokens, res)
  }

  // Cookies
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
