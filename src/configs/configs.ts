export const configModule = {
  isGlobal: true,
}

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXP },
}
