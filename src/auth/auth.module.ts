import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from './prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../configs/configs'

@Module({
  imports: [JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
