import { registerEnumType } from '@nestjs/graphql';

/**
 * 连衣裙尺寸选项
 */
export enum DressMeasureOption {
  /**
  * 袖长
  */
  SLEEVE_LENGTH = '袖长',
  /**
   * 袖宽
   */
  SLEEVE_WIDTH = '袖宽',
  /**
  * 肩宽
  */
  SHOULDER_WIDTH = '肩宽',
  /**
   * 胸围
   */
  BUST = '胸围'
  /**
   * 腰围 */,
  WAISTLINE = '腰围',
  /**
   * 下摆宽
   */
  HEM_WIDTH = '下摆宽',
  /**
   * 裙长
   */
  SKIRT_LENGTH = '裙长',
}

/**
 * 半身裙尺寸选项
 */
export enum SkirtMeasureOption {
  /**
   * 腰围
   */
  WAISTLINE = '腰围',
  /**
   * 下摆宽
   */
  HEM_WIDTH = '下摆宽',
  /**
   * 裙长
   */
  SKIRT_LENGTH = '裙长',
}

/**
 * 长袖衬衫 短袖衬衫 针织衫 开衫 T恤 卫衣 毛衣 抓绒衣 POLO衫 背心 尺寸选项
 * 没有袖宽
 */
export enum ShirtMeasureOption {
  /**
  * 袖长
  */
  SLEEVE_LENGTH = '袖长',
  /**
  * 连肩袖长
  */
  Raglan_sleeve_length = '连肩袖长',
  /**
  * 肩宽
  */
  SHOULDER_WIDTH = '肩宽',
  /**
   * 胸围
   */
  BUST = '胸围',
  /**
   * 下摆宽
   */
  HEM_WIDTH = '下摆宽',
  /**
   * 衣长
   */
  clothes_length = '衣长',
}

/**
 * 大衣 西装 羽绒服 棉服 风衣 冲锋衣 夹克 马甲 外套  三合一外套 皮肤衣 尺寸选项
 * 有袖宽
 */
export enum CoatMeasureOption {
  /**
  * 连肩袖长
  */
  Raglan_sleeve_length = '连肩袖长',
  /**
   * 袖长
   */
  SLEEVE_LENGTH = '袖长',
  /**
   * 袖宽
   */
  SLEEVE_WIDTH = '袖宽',
  /**
   * 肩宽
   */
  SHOULDER_WIDTH = '肩宽',
  /**
   * 胸围
   */
  BUST = '胸围',
  /**
   * 下摆宽
   */
  HEM_WIDTH = '下摆宽',
  /**
   * 衣长
   */
  clothes_length = '衣长',
}

/**
 * 裤子
 */
export enum PantsMeasureOption {
  /**
   * 腰围
   */
  WAISTLINE = '腰围',
  /**
   * 臀围
   */
  HIP = '臀围',
  /**
   * 裤脚围
   */
  LEG_OPENING = '裤脚围',
  /**
   * 裤长
   */
  TROUSERS_LENGTH = '裤长'
}

/**
 * 衣服国际尺寸
 */
export enum ClothingInternationalSize {
  XS = 'XS',
  XXS = 'XXS',
  S = 'S',
  M = 'M',
  XL = 'XL',
  '2XL' = '2XL',
  '3XL' = '3XL',
  '4XL' = '4XL',
  '5XL' = '5XL',
  '6XL' = '6XL',
  'AverageSize' = 'AverageSize',
}

/**
 * 衣服厚度
 */
export enum ClothingThickness {
  /**
   * 适中
   */
  NORMAL = 'normal',
  /**
   * 薄
   */
  THIN = 'thin',
  /**
   * 厚
   */
  THICK = 'thick'
}

registerEnumType(DressMeasureOption, {
  name: 'DressMeasureOption'
})
registerEnumType(SkirtMeasureOption, {
  name: 'SkirtMeasureOption'
})
registerEnumType(ShirtMeasureOption, {
  name: 'ShirtMeasureOption'
})
registerEnumType(CoatMeasureOption, {
  name: 'CoatMeasureOption'
})
registerEnumType(PantsMeasureOption, {
  name: 'PantsMeasureOption'
})
registerEnumType(ClothingInternationalSize, {
  name: 'ClothingInternationalSize'
})
registerEnumType(ClothingThickness, {
  name: 'ClothingThickness'
})