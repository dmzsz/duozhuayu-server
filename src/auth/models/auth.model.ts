import { User } from '@/types/user.type'
import { ObjectType } from '@nestjs/graphql'
// import type { User } from '@/entities'
import { Token } from './token.model'

@ObjectType()
export class Auth extends Token {
  user: User
}
