import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PrismaService } from './prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from '../configs/configs'
import { RolesGuard } from '../guards/roles.guard'
import { AuthGuard } from '../guards/auth.guard'

@Module({
  imports: [JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, RolesGuard, AuthGuard],
})
export class AuthModule {}
