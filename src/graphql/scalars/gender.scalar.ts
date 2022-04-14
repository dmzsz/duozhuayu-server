// import { Gender } from '@/shared/enums';
// export const GenderTypeResolver: Record<keyof typeof Gender, any> = {
//     UNKNOWN: '',
//     MALE: 'male',
//     FEMALE: 'female',
// };


import { Gender } from '@/shared/enums'
import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind } from 'graphql'

@Scalar('Gender')
export class GenderScalar implements CustomScalar<string, String> {
  description = 'Gender Enum Type scalar type'

  parseValue(value: string): string {
    return Gender[value] // value from the client
  }

  serialize(value: string): string {
    return Gender[value] // value sent to the client
  }

  parseLiteral(ast: any): string | null {
    if (ast.kind === Kind.STRING) {
      return Gender[ast.value]
    }
    return null
  }
}