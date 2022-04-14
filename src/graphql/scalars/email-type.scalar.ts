// import { EmailType } from '@/shared/enums';
// export const EmailTypeResolver: Record<keyof typeof EmailType, any> = {
//     VERIFY_EMAIL: 'verify_email',
//     FORGOT_PASSWORD: 'forgot_password'
// };

import { EmailType } from '@/shared/enums'
import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind } from 'graphql'

@Scalar('EmailType')
export class EmailTypeScalar implements CustomScalar<string, String> {
  description = 'Email Enum Type scalar type'

  parseValue(value: string): string {
    return EmailType[value] // value from the client
  }

  serialize(value: string): string {
    return EmailType[value] // value sent to the client
  }

  parseLiteral(ast: any): string | null {
    if (ast.kind === Kind.STRING) {
      return EmailType[ast.value]
    }
    return null
  }
}
