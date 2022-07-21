import { LockProduct } from '@/entities';
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
    /**
     * 全新
     */
    NEW = 'new',
    /**
     * 品相良好
     */
    FINE = 'fine',
    /**
     * 有破损 详见FlawReasons
     */
    MEDIUM = 'medium'
}

/**
 * 破损
 */
export enum FlawReasons {
    /**
     * 可拆卸外封套缺失
     */
    COVER_LOST = "cover_lost",
    /**
     * 轻度污渍
     */
    LIGHTLY_DIRTY = "lightly_dirty",
    /**
     * 轻度污渍 发霉
     */
    LIGHTLY_MILDEW = "lightly_mildew",
    /**
    * 轻度磨损或破损
    */
    LIGHTLY_BREAKAGE = "lightly_breakage",
    /**
     * 磨损或破损 划伤
     */
    LIGHTLY_SCRATCHED = "lightly_scratched",
    /**
     * 轻度折痕
     */
    LIGHTLY_FOLDED = "lightly_folded",
    /**
     * 有划线或标注
     */
    MARKS = "marks",
    /**
     * 附着胶带或标签
     */
    "NON-REMOVABLE_LABELS" = "non-removable_labels",
    /**
     * 缺失附件（CD）
     */
    ATTACHMENT_LOST = "attachment_lost",
    /**
     * 泛黄或褪色
     */
    AGING = "aging",
    /**
     * 印刷问题
     */
    QUALITY_ISSUES = "quality_issues",
    /**
     * 变形
     */
    LIGHTLY_DEFORM = "lightly_deform"
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


export enum LockProductPaySatus {
    /**
     * 等待支付
     */
    PENDING_PAYMENT,
    /**
     * 以付款
     */
    Paid,
    /**
     * 取消或者过期 扣款了
     */
    Refunded
}

/**
 * 商品状态
 */
export enum ProductStatus {
    /**
     * 已拍下
     */
    BOUGHT = 0,
    /**
     * 待付款
     */
    PAYMENT_PENDING,
    /**
     * 已付款
     */
    PAID,
    /**
     * 已发货
     */
    SALE,
    /**
     * 交易完成
     */
    TRANSACTION_COMPLETION,
    /**
     * 待评价
     */
    COMMENTED,
}
/**
 * 审查状态
 */
export enum CensoredStatus {
    /**
     * 正在审核
     */
    UNDER_REVIEW = 'under_review',
    /**
     * 已被驳回
     */
    REJECTED = 'rejected',
    /**
     * 通过
     */
    PASSED = 'passed'
}

/**
 * 商品单位
 */
export enum ProductUnit {
    /**
     * 包
     */
    package,
    /**
     * 块
     */
    piece,
    /**
     *  本
     */
    ben,
    /**
     * 双，对
     */
    pair,
    /**
     * 台，套，架
     */
    set,
    /**
     * 条
     */
    bar,
    /**
     * 	张
     */
    sheet,
    /**
     * 袋
     */
    bag,
    /**
     * 件，辆
     */
    unit,
}

/**
 * 锁定产品的状态
 */
export enum LockProductStatus {
    /**
     * 可用
     */
    AVAILABLE,
    /**
     * 没有使用过期了
     */
    EXPIRED,
    /**
     * 取消了
     */
    CANCELLED,
    /**
     * 购买了
     */
    BOUGHT,
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
registerEnumType(ProductStatus, {
    name: 'ProductStatus'
})
registerEnumType(ProductStatus, {
    name: 'CensoredStatus'
})
registerEnumType(LockProductPaySatus, {
    name: 'LockProductPaySatus'
})
