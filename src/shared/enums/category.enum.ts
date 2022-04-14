import { registerEnumType } from '@nestjs/graphql'

export enum CategoryType {
  BOOK = 'Book',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  BRAND = 'brand',
}

registerEnumType(CategoryType, {
  name: 'CategoryType'
})