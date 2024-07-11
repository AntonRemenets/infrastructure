import { BadRequestException, Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { PrismaService } from './prisma.service'
import { Role, UserModel } from './models/user.model'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async newUser(dto: RegisterUserDto): Promise<UserModel> {
    const candidate: UserModel = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    })
    if (candidate) {
      throw new BadRequestException('Пользователь уже сужествует')
    }
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: await this.hashPassword(dto.password),
        role: Role.USER,
      },
    })
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()

    return await bcrypt.hash(password, salt)
  }
}
