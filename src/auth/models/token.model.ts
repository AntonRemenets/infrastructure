import { Token } from '@prisma/client'

export class TokensModel {
  accessToken: string
  refreshToken: Token
}
