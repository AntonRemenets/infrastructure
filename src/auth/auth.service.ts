import { Injectable } from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { PrismaService } from './prisma.service'
import { Role, UserModel } from './models/user.model'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async newUser(dto: RegisterUserDto): Promise<UserModel> {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        role: Role.USER,
      },
    })
  }
}
