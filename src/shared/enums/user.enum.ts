import { registerEnumType } from '@nestjs/graphql'

/**
 * 性别
 */
export enum Gender {
  UNKNOWN = '',
  MALE = 'male',
  FEMALE = 'female',
}


registerEnumType(Gender, {
  name: 'Gender',
})