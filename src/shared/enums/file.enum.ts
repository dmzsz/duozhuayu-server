import { registerEnumType } from '@nestjs/graphql';

export enum ImageSize {
  LARGE = 'large',
  MEDIUM = 'male',
  ORIGIN = 'origin',
  SMALL = 'small',
}

export enum ImageType {
  /**
   * 封皮照片
   */
  COVER = 'cover',
  /**
   * 详情照片
   */
  DETAILS = 'details',

  /**
   * 书单封皮
   */
  OPEN_COLLECTION_COVER = 'openCollectionCover',

  /**
    * 商标
    */
  BRAND = 'brand',

  /**
   * 破损详情
   */
  FLAW_DETAIL = 'flaw_detail',


  /**
   * 破损位置
   */
  FLAW_POSITION = 'flaw_position',

  /**
   * 游戏截图
   */
  screen_shot = 'screen_shot',
}

export enum FlawImageType {
  FLAW_DETAIL = ImageType.FLAW_DETAIL,
  FLAW_POSITION = ImageType.FLAW_POSITION
}

registerEnumType(ImageSize, {
  name: 'ImageSize',
})


registerEnumType(ImageType, {
  name: 'ImageType',
})

registerEnumType(FlawImageType, {
  name: 'FlawImageType',
})