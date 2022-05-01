import { registerEnumType } from '@nestjs/graphql'

export enum CategoryType {
  PRODUCT='product',
  BOOK = 'book',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  BRAND = 'brand',
}

registerEnumType(CategoryType, {
  name: 'CategoryType'
})