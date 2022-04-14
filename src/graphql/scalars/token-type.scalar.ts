// import { TokenType } from '@/shared/enums';
// export const TokenTypeResolver: Record<keyof typeof TokenType, any> = {
//     ACCESS_TOKEN: 'access_token',
//     REFRESH_TOKEN: 'refresh_token',
//     EMAIL_TOKEN: 'email_token',
//     RESETPASS_TOKEN: 'resetpass_token'
// };

import { TokenType } from '@/shared/enums'
import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind } from 'graphql'

@Scalar('TokenType')
export class TokenTypeScalar implements CustomScalar<string, String> {
  description = 'TokenType Enum Type scalar type'

  parseValue(value: string): string {
    return TokenType[value] // value from the client
  }

  serialize(value: string): string {
    return TokenType[value] // value sent to the client
  }

  parseLiteral(ast: any): string | null {
    if (ast.kind === Kind.STRING) {
      return TokenType[ast.value]
    }
    return null
  }
}