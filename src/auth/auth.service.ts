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
import { TokenModel } from './models/token.model'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // Registration
  async newUser(dto: RegisterUserDto): Promise<TokenModel> {
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

  // Authorization
  async login(dto: RegisterUserDto): Promise<TokenModel> {
    const user: UserModel = await this.prisma.user.findFirst({
      where: { email: dto.email },
    })
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Не верный логин или пароль')
    }

    return this.generateTokens(user)
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  private async generateTokens(user: UserModel): Promise<TokenModel> {
    const accessToken: string =
      'Bearer ' +
      this.jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      })

    return { accessToken }
  }
}
