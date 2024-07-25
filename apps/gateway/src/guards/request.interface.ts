import { Request } from 'express'
import { PayloadModel } from '../auth/models/payload.model'

export interface RequestPayload extends Request {
  authorization?: string
  user: PayloadModel
}
