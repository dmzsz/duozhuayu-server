import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
    BOOK = 'book',
    CLOTHING = 'clothing',
    ELECTRONICS = 'electronics'
}

/**
 * 品相
 */
export enum Condition {
    UNKNOWN = 'unknown',
    FINE = 'fine',
    MEDIUM = 'medium'
}

/**
 * 磨损程度 
 */
export enum FlawDegree {
    /**
     * 没有明显磨损
     */
    NULL = 'null',
    /**
     * 部分
     */
    PARTIAL = 'partial',
    /**
     * 大部分
     */
    MOST = 'most'
}

/**
 * kindle 属性
 */
export enum KindleSpecificationLabel {
    /**
     * 容量
     * value: 32G
     */
    CAPACITY = '容量',
    /**
     * 颜色
     * value: 银灰色
     */
    COLOR = '颜色',
    /**
     * 发行年份
     * value: 2017
     */
    RELEASE_YEAR = '发行年份',
    /**
     * 屏幕
     * value: 7 英寸，300ppi
     */
    SCREEN = '屏幕',
    /**
     * 翻页方式
     * value: 触屏翻页 + 按键翻页
     */
    PAGE_TURNING_MODE = '翻页方式',
    /**
     * 内置阅读灯
     * value: 有或无
     */
    HAS_READING_LAMP = '内置阅读灯',
    /**
     * 电池容量
     * value: 1000mAH
     */
    BATTERY_CAPACITY = '电池容量',
}

/**
 * 耳机属性
 */
// export enum HeardsetSpecificationLabel {
//     /**
//      * 佩戴方式
//      * 入耳式
//      */
//     WEARING_MODE = '佩戴方式',
//     /**
//      * 类型
//      * 真无线
//      */
//     TYPE = '类型',
//     /**
//      * 颜色
//      * value: 银灰色
//      */
//     COLOR = '颜色',
//     /**
//      * 发行年份
//      * value: 2017
//      */
//     RELEASE_YEAR = '发行年份',
//     /**
//      * 电池容量
//      * value: 1000mAH
//      */
//     BATTERY_CAPACITY = '电池容量',
// }

/**
 * 游戏机属性
 */
// export enum RecreationalMachineSpecificationLabel {
//     /**
//      * 佩戴方式
//      * value: 颈挂式
//      */
//     WEARING_MODE = 'WEARING_MODE',
//     /**
//      * 类型
//      * value: 家用掌上一体机
//      */
//     TYPE = 'TYPE',
//     /**
//      * 颜色
//      * value: 红蓝
//      */
//     COLOR = 'COLOR',
//     /**
//      * 发行年份
//      * value: 2017
//      */
//     RELEASE_YEAR = 'RELEASE_YEAR',
//     /**
//      * 电池容量
//      * value: 1000mAH
//      */
//     BATTERY_CAPACITY = 'BATTERY_CAPACITY',

//     /**
//      * 地区
//      * 非国行
//      */
//     AREA = 'AREA',

//     /**
//     * 容量
//     * value: 1TB
//     */
//     CAPACITY = 'CAPACITY',
// }

export enum gameCassette {
    /**
     * 游戏类型
     * 动作冒险
     */
    GAME_TYPE = '游戏类型',
    /**
     * 游戏模式
     * 仅单机
     */
    GAME_MODE = '游戏模式',
    /**
     * 玩家人数
     * 仅一人
     */
    PLAYER_NUMBER = '玩家人数',
    /**
     * 语言
     * 支持中文
     */
    LANGUAGE = '语言',
    /**
     * 发行年份
     * value: 2017
     */
    RELEASE_YEAR = '发行年份',
    /**
     * 地区
     * 非国行
     */
    AREA = '地区',
}
/**
 * 支付状态
 * 
 * BUYER_PAYS 买家付款 
 * BUYER_CONFIRMS_PAYMENT 买家确认付款
 * PAY_TO_SELLER 支付给卖家
 * REFUND_TO_BUYER 退款给买家
 */
export enum Paymentstatus {
    /**
     * 买家付款
     */
    BUYER_PAYS = 'buyer_pays',
    /**
    * 买家确认付款
    */
    BUYER_CONFIRMS_PAYMENT = 'buyer_confirms_payment',
    /**
     * 支付给卖家
     */
    PAY_TO_SELLER = 'pay_to_seller',
    /**
     * 退款给买家
     */
    REFUND_TO_BUYER = 'refund_to_buyer',
}
/**
 * 商品状态
 */
export enum ProductStatus {
    /**
     * 验卖家货中
     */
    UNDER_INSPECTION = 'under_inspection',
    /**
     * 出售中
     */
    SALE = 'sale',
    /**
     * 交易完成
     */
    SOLD = 'sold'
}

/**
 * 物流状态
 */
export enum LogisticsStatus {
    /**
     *  等待卖家发货
     */
    WAITING_SELLER = 'waiting_seller',
    /**
     * 卖家发货
     */
    SELLER = 'platform_receipt',
    /**
     * 平台收到卖家商品
     */
    PLATFORM_RECEIVES_SELLER = 'platform_receives_seller',
    /**
     * 退货给卖家
     */
    RETURN_TO_SELLER = 'return_to_seller',
    /**
     * 卖家签收
     */
    SELLER_SIGNATURE = 'seller_signature',
    /**
     * 发货给买家
     */
    SHIP_TO_BUYER = 'ship_to_buyer',
    /**
     * 买家签收
     */
    BUYER_SIGNED = 'buyer_signed',
    /**
     * 买家退货
     */
    BUYER_RETURNS = 'buyer_returns',
    /**
     * 平台收到买家退货
     */
    PLATFORM_RECEIVES_BUYER = 'platform_receives_buyer',
}


registerEnumType(ProductType, {
    name: 'ProductType'
})
registerEnumType(Condition, {
    name: 'Condition'
})
registerEnumType(FlawDegree, {
    name: 'FlawDegree'
})
registerEnumType(KindleSpecificationLabel, {
    name: 'KindleSpecificationLabel'
})
// registerEnumType(HeardsetSpecificationLabel, {
//     name: 'HeardsetSpecificationLabel '
// })
// registerEnumType(RecreationalMachineSpecificationLabel, {
//     name: 'RecreationalMachineSpecificationLabel '
// })
registerEnumType(gameCassette, {
    name: 'gameCassette'
})
registerEnumType(Paymentstatus, {
    name: 'Paymentstatus'
})
registerEnumType(ProductStatus, {
    name: 'ProductStatus'
})
registerEnumType(LogisticsStatus, {
    name: 'LogisticsStatus'
})