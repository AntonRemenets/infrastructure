import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { PrismaService } from './prisma.service'
import { Role, UserModel } from './models/user.model'
import * as bcrypt from 'bcrypt'
import { compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { TokensModel } from './models/token.model'
import { AuthLoginDto } from './dto/auth.dto'
import { v4 } from 'uuid'
import { add } from 'date-fns'
import { Token } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // REGISTRATION
  async newUser(dto: RegisterUserDto): Promise<TokensModel> {
    const candidate: UserModel = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })
    if (candidate) {
      throw new BadRequestException('Пользователь уже сужествует')
    }
    const newUser: UserModel = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await this.hashPassword(dto.password),
        role: Role.USER,
      },
    })

    return this.generateTokens(newUser)
  }

  // AUTHORIZATION
  async loginWithCredentials(dto: AuthLoginDto): Promise<TokensModel> {
    const user: UserModel = await this.prisma.user.findFirst({
      where: { email: dto.email },
    })
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Не верный логин или пароль')
    }

    return this.generateTokens(user)
  }

  async loginWithAccessToken() {}

  // CRYPT
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  // TOKENS
  // Generate
  private async generateTokens(user: UserModel): Promise<TokensModel> {
    const accessToken: string =
      'Bearer ' +
      this.jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      })
    const refreshToken: Token = await this.getRefreshToken(user.id)
    return { accessToken, refreshToken }
  }

  // Get Refresh Token
  private async getRefreshToken(userId: number): Promise<Token> {
    const token: Token = await this.prisma.token.findFirst({
      where: {
        userId,
      },
    })
    if (!token) {
      return this.prisma.token.create({
        data: {
          refreshToken: v4(),
          exp: add(new Date(), { months: 1 }),
          userId,
        },
      })
    } else {
      return this.prisma.token.update({
        where: { refreshToken: token.refreshToken },
        data: {
          refreshToken: v4(),
          exp: add(new Date(), { months: 1 }),
        },
      })
    }
  }

  // Refresh Tokens
  async refreshTokens(refreshToken: Token): Promise<TokensModel> {
    const token: Token = await this.prisma.token.delete({
      where: { refreshToken: refreshToken.refreshToken },
    })
    if (!token || new Date(token.exp) < new Date()) {
      throw new UnauthorizedException()
    }
    const user: UserModel = await this.prisma.user.findFirst({
      where: { id: token.userId },
    })

    return this.generateTokens(user)
  }
}
