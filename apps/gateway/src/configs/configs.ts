// export const configModule: ConfigModuleOptions = {
//   isGlobal: true,
//   envFilePath: './.env',
// }

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXP },
}
