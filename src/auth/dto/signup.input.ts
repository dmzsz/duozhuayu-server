import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class SignupInput {

  @IsEmail()
  @Field()
  email: string | undefined

  @IsNotEmpty()
  @Field()

  @MinLength(8)
  password!: string

  @Field()
  firstname?: string

  @Field()
  lastname?: string
}
