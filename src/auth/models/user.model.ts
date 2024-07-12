export class UserModel {
  id: number
  email: string
  password: string
  role: string
  accessToken?: string
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
