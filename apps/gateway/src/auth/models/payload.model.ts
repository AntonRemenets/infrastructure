import { Role } from './user.model'

export class PayloadModel {
  id: string
  email: string
  role: Role[]
  iat: Date
  exp: Date
}
