import { ConfigModuleOptions } from '@nestjs/config'

export const configModule: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: './.env',
}
