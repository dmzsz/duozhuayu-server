import { registerEnumType } from '@nestjs/graphql'

export enum CategoryType {
  PRODUCT='product',
  BOOK = 'book',
  CLOTHING = 'clothing',
  ELECTRONICS = 'electronics',
  BRAND = 'brand',
}

export enum BookTagType {
  AUTHOR='author',
  COLLECTION='collection',
  CONTENT='content',
  PRODUCER='producer',
  series='series' //系列书籍
}

registerEnumType(CategoryType, {
  name: 'CategoryType'
})