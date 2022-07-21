import { Customer } from '@/types/customer.type'
import { ObjectType } from '@nestjs/graphql'
// import type { Customer } from '@/entities'
import { Token } from './token.model'

@ObjectType()
export class Auth extends Token {
  customer: Customer
}
