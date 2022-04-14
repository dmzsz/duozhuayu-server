import { EmailType } from '@/shared/enums'
import { Field, InputType } from '@nestjs/graphql'
import { IsEnum } from 'class-validator'

@InputType()
export class CreateBookInput {
    @Field()
    userId: string

    @Field(() => EmailType) // 不指定类型的话会报错: Error: Undefined type error. Make sure you are providing an explicit type for the 'type' of the 'CreateEmailInput' class
    @IsEnum(EmailType)
    type: EmailType
}