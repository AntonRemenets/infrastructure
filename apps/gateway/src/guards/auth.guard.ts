import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RequestPayload } from './request.interface'
import { PayloadModel } from '../auth/models/payload.model'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(req)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload: PayloadModel = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        ignoreExpiration: false,
      })
      req['user'] = payload
    } catch (e) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(req: RequestPayload): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
